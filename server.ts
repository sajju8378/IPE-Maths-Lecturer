import 'dotenv/config';
import express from 'express';
import path from 'path';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

const app = express();
app.use(express.json({ limit: '12mb' }));

// Allow GitHub Pages and Capacitor mobile WebView clients to call /api/*
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function sanitizeSpeechText(text: string): string {
  return text
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, ' ')
    .replace(/[*_`#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const solutionSchema = {
  type: Type.OBJECT,
  properties: {
    question_text: {
      type: Type.STRING,
      description: 'Clean statement of the problem with math formatted in LaTeX ($...$).',
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step_number: { type: Type.INTEGER },
          section_label: {
            type: Type.STRING,
            description:
              'TGBIE IPE board heading such as "Given", "To Find", "To Prove", "Formula", "Step 1", "Step 2", or "Final Answer".',
          },
          board_text: {
            type: Type.STRING,
            description:
              'What the lecturer writes on the green board in English, with all mathematical expressions wrapped in $...$ or $$...$$ LaTeX.',
          },
          speech: {
            type: Type.STRING,
            description:
              'Spoken classroom explanation delivered WHILE writing this step, explaining why this step is done. Never include raw LaTeX commands or dollar signs in speech.',
          },
          key_point: {
            type: Type.STRING,
            description:
              'Optional concise TGBIE examiner tip, marking-scheme point, or common mistake to avoid.',
          },
        },
        required: ['step_number', 'section_label', 'board_text', 'speech'],
      },
    },
  },
  required: ['question_text', 'steps'],
};

const verificationSchema = {
  type: Type.OBJECT,
  properties: {
    verified: {
      type: Type.BOOLEAN,
      description:
        'True ONLY if the problem is clear and every mathematical step and the final answer are 100% verified correct using Intermediate-level methods.',
    },
    verification_note: {
      type: Type.STRING,
      description:
        'Short plain-language summary for the student confirming verification or explaining clearly why the working/answer could not be verified.',
    },
    use_corrected_solution: {
      type: Type.BOOLEAN,
      description:
        'True if the verifier corrected an error and produced a verified corrected step list.',
    },
    corrected_steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step_number: { type: Type.INTEGER },
          section_label: { type: Type.STRING },
          board_text: { type: Type.STRING },
          speech: { type: Type.STRING },
          key_point: { type: Type.STRING },
        },
        required: ['step_number', 'section_label', 'board_text', 'speech'],
      },
    },
  },
  required: ['verified', 'verification_note', 'use_corrected_solution'],
};

app.post('/api/solve', async (req, res) => {
  try {
    const {
      question,
      paper,
      chapter,
      questionType,
      language = 'en',
      imageBase64,
      imageMimeType,
    } = req.body ?? {};

    if ((!question || typeof question !== 'string' || !question.trim()) && !imageBase64) {
      res.status(400).json({ error: 'Please provide a question or upload a photo of the problem.' });
      return;
    }

    const ai = getGeminiClient();

    const languageInstruction =
      language === 'te-en'
        ? `For "speech" ONLY: speak in a natural, warm Hyderabad Telugu-English mix (Tenglish written in Roman script, e.g. "Chudandi students, manam ikkada first...", "Deeni formula entante...", "Eppudu simplify cheste mana final answer vastundi"). Keep mathematical terms in English ("derivative", "integration", "modulus", "roots", "LHS", "RHS"). Keep "board_text" strictly in standard English + LaTeX.`
        : `For "speech" ONLY: speak in clear, warm, natural Indian English like a patient Telangana Intermediate classroom lecturer guiding students step by step.`;

    const contextLines = [
      paper ? `Paper: ${paper}` : '',
      chapter ? `Chapter: ${chapter}` : '',
      questionType ? `Question Format: ${questionType}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const solveSystemInstruction = `You are a senior Telangana State Board of Intermediate Education (TGBIE / IPE) Mathematics Lecturer teaching on a classroom green board.

Solve the student's question exactly the way a TGBIE IPE examiner expects:
1. Structure the steps logically using standard TGBIE headings: "Given", "To Find" or "To Prove", "Formula" (when applicable), "Step 1", "Step 2", ..., and "Final Answer".
2. Use ONLY Intermediate (Class 11 / 12 TGBIE Telugu Akademi) methods. Do NOT use higher engineering shortcuts or advanced university theorems not in the TGBIE syllabus.
3. Keep each step focused (1–3 lines on the board) so the student can follow line by line while listening.
4. Format EVERY mathematical symbol, expression, and equation in "board_text" using valid KaTeX LaTeX ($...$ for inline math, $$...$$ for important standalone equations). Never use unsupported macros; stick to standard LaTeX (\\frac, \\sqrt, \\sin, \\cos, \\tan, \\int, \\sum, \\lim, \\implies, \\therefore, \\begin{aligned}...\end{aligned}, etc.).
5. ${languageInstruction}
6. In "speech", explain WHY each step is being done WHILE it is written (never just read symbols blindly). Never put dollar signs or backslash LaTeX commands in "speech"; write math words naturally in spoken form (e.g., "x square plus y square equals r square").
7. Include a helpful "key_point" (exam marking tip or common student mistake) on key steps where students commonly lose marks in IPE.`;

    const solveParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      solveParts.push({
        inlineData: {
          mimeType: typeof imageMimeType === 'string' && imageMimeType ? imageMimeType : 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    solveParts.push({
      text: `${contextLines ? `[${contextLines}]\n` : ''}${
        question && question.trim()
          ? `Problem:\n${question.trim()}`
          : 'Read the mathematics problem clearly from the uploaded photo, transcribe it into question_text, and solve it completely for TGBIE IPE.'
      }`,
    });

    // Pass 1: Generate structured TGBIE step-by-step solution
    const solveResponse = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: { parts: solveParts },
      config: {
        systemInstruction: solveSystemInstruction,
        responseMimeType: 'application/json',
        responseSchema: solutionSchema,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      },
    });

    const rawSolveJson = (solveResponse.text ?? '').trim();
    if (!rawSolveJson) {
      throw new Error('Empty response received while solving the problem.');
    }

    const parsedSolution = JSON.parse(rawSolveJson) as {
      question_text: string;
      steps: Array<{
        step_number: number;
        section_label: string;
        board_text: string;
        speech: string;
        key_point?: string;
      }>;
    };

    // Pass 2: Independent Chief Examiner Verification Check
    const verifyParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
    if (imageBase64 && typeof imageBase64 === 'string') {
      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      verifyParts.push({
        inlineData: {
          mimeType: typeof imageMimeType === 'string' && imageMimeType ? imageMimeType : 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    verifyParts.push({
      text: `Original Student Prompt: ${question?.trim() || '(From uploaded photo)'}
Extracted Question: ${parsedSolution.question_text}
Proposed Solution Steps JSON:
${JSON.stringify(parsedSolution.steps, null, 2)}

Verify this solution rigorously:
1. If an image was uploaded, confirm the problem was transcribed accurately and completely (if the image is unreadable, blurry, or missing essential numbers/conditions, set verified=false and explain clearly).
2. Re-derive every step independently using TGBIE Intermediate methods. Check every sign, constant, integration/differentiation rule, boundary, and final answer.
3. If there is a mistake in the working or final answer that can be fixed cleanly, set use_corrected_solution=true, provide complete corrected_steps (matching the exact language mode: ${language === 'te-en' ? 'Telugu-English mix for speech, English + LaTeX for board_text' : 'English for speech and board_text'}), and set verified=true if you are 100% certain of the corrected solution.
4. If the problem itself is ambiguous, incomplete, unsolvable as stated, or the answer cannot be verified with certainty, set verified=false and write a clear explanation in verification_note for the student.`,
    });

    const verifyResponse = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: { parts: verifyParts },
      config: {
        systemInstruction:
          'You are an independent TGBIE Chief Examiner verifying Intermediate Mathematics solutions for 100% mathematical accuracy before they reach the classroom board.',
        responseMimeType: 'application/json',
        responseSchema: verificationSchema,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });

    const rawVerifyJson = (verifyResponse.text ?? '').trim();
    const verification = rawVerifyJson
      ? (JSON.parse(rawVerifyJson) as {
          verified: boolean;
          verification_note: string;
          use_corrected_solution: boolean;
          corrected_steps?: typeof parsedSolution.steps;
        })
      : {
          verified: false,
          verification_note: 'Verification check did not return a confirmation.',
          use_corrected_solution: false,
        };

    const finalSteps =
      verification.use_corrected_solution &&
      Array.isArray(verification.corrected_steps) &&
      verification.corrected_steps.length > 0
        ? verification.corrected_steps
        : parsedSolution.steps;

    const normalizedSteps = finalSteps.map((step, idx) => ({
      step_number: idx + 1,
      section_label: step.section_label || `Step ${idx + 1}`,
      board_text: step.board_text || '',
      speech: sanitizeSpeechText(step.speech || ''),
      key_point: step.key_point?.trim() || undefined,
    }));

    res.json({
      question_text: parsedSolution.question_text || question || 'Uploaded Question',
      verified: Boolean(verification.verified),
      verification_note:
        verification.verification_note ||
        (verification.verified
          ? 'Working and final answer verified for TGBIE Intermediate standards.'
          : 'This solution could not be fully verified. Please double-check the problem statement.'),
      steps: normalizedSteps,
    });
  } catch (err) {
    console.error('Error in /api/solve:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate solution.';
    res.status(500).json({ error: message });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body ?? {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Text is required for speech synthesis.' });
      return;
    }

    const cleanText = sanitizeSpeechText(text);
    const ai = getGeminiClient();

    const stylePrompt =
      language === 'te-en'
        ? 'Warm, friendly Telangana mathematics lecturer from Hyderabad speaking a natural Telugu-English mix clearly at a steady classroom pace.'
        : 'Warm, clear Indian mathematics lecturer explaining step by step at a steady, encouraging classroom pace.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: stylePrompt,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      res.status(502).json({ error: 'No audio returned from TTS service.' });
      return;
    }

    res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err) {
    console.error('Error in /api/tts:', err);
    const message = err instanceof Error ? err.message : 'TTS generation failed.';
    res.status(500).json({ error: message });
  }
});

app.post('/api/explain-simpler', async (req, res) => {
  try {
    const { question, currentStep, language = 'en' } = req.body ?? {};
    if (!currentStep || typeof currentStep.board_text !== 'string') {
      res.status(400).json({ error: 'Current step details are required.' });
      return;
    }

    const ai = getGeminiClient();
    const langGuide =
      language === 'te-en'
        ? 'Write "speech" in warm, easy Telugu-English mix (Tenglish in Roman script, e.g., "Sare, chinnaga oka simple example tho chuddam..."). Keep "board_example" in English with KaTeX LaTeX.'
        : 'Write "speech" in very simple, friendly classroom English. Keep "board_example" in English with KaTeX LaTeX.';

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Original Question: ${question || ''}
Current Step (${currentStep.section_label}):
Board Text: ${currentStep.board_text}
Previous Explanation: ${currentStep.speech}

A student clicked "I didn't understand". Re-explain THIS step in much simpler words and give one tiny concrete numerical or intuitive example so the concept clicks immediately.`,
      config: {
        systemInstruction: `You are a patient TGBIE Intermediate Maths lecturer helping a confused student. ${langGuide} Keep "board_example" short (2-3 lines max, valid $...$ or $$...$$ LaTeX) and "speech" concise (3-4 sentences, no raw LaTeX symbols).`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            board_example: { type: Type.STRING },
            speech: { type: Type.STRING },
          },
          required: ['board_example', 'speech'],
        },
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim()) as {
      board_example: string;
      speech: string;
    };

    res.json({
      board_example: parsed.board_example || '',
      speech: sanitizeSpeechText(parsed.speech || ''),
    });
  } catch (err) {
    console.error('Error in /api/explain-simpler:', err);
    const message = err instanceof Error ? err.message : 'Failed to simplify step.';
    res.status(500).json({ error: message });
  }
});

app.post('/api/ask-doubt', async (req, res) => {
  try {
    const { question, currentStep, doubt, language = 'en' } = req.body ?? {};
    if (!doubt || typeof doubt !== 'string' || !doubt.trim()) {
      res.status(400).json({ error: 'Please type your doubt first.' });
      return;
    }

    const ai = getGeminiClient();
    const langGuide =
      language === 'te-en'
        ? 'Answer "speech" in warm, natural Hyderabad Telugu-English mix (Tenglish in Roman script). Keep "board_note" in English with $...$ LaTeX.'
        : 'Answer "speech" in clear, friendly classroom English. Keep "board_note" in English with $...$ LaTeX.';

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Original Question: ${question || ''}
Current Step (${currentStep?.section_label || 'Step'}):
Board Text: ${currentStep?.board_text || ''}
Lecturer Explanation: ${currentStep?.speech || ''}

Student's Doubt: ${doubt.trim()}`,
      config: {
        systemInstruction: `You are a TGBIE Intermediate Maths lecturer answering a student's raised-hand doubt right in the middle of class. Answer directly, accurately, and briefly (2-4 sentences) so the lecture can resume smoothly. ${langGuide} Never use raw LaTeX inside "speech".`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            board_note: { type: Type.STRING },
            speech: { type: Type.STRING },
          },
          required: ['speech'],
        },
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim()) as {
      board_note?: string;
      speech: string;
    };

    res.json({
      board_note: parsed.board_note || undefined,
      speech: sanitizeSpeechText(parsed.speech || ''),
    });
  } catch (err) {
    console.error('Error in /api/ask-doubt:', err);
    const message = err instanceof Error ? err.message : 'Failed to answer doubt.';
    res.status(500).json({ error: message });
  }
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IPE Maths Lecturer server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
