const CONFIGURED_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (CONFIGURED_BASE) {
    return `${CONFIGURED_BASE}${normalizedPath}`;
  }
  return normalizedPath;
}

export async function readApiJson<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    if (res.status === 404 && typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
      throw new Error(
        'GitHub Pages hosts the static web interface only. To solve questions with Gemini, set VITE_API_BASE_URL to your deployed backend server or open the full-stack server URL.'
      );
    }
    throw new Error(`Server returned an unexpected response (${res.status}).`);
  }
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status}).`);
  }
  return data;
}
