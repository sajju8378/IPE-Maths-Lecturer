const CONFIGURED_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export function hasBackendApi(): boolean {
  if (CONFIGURED_BASE) return true;
  if (typeof window === 'undefined') return true;
  const isStaticHost =
    window.location.hostname.endsWith('github.io') ||
    window.location.protocol === 'capacitor:' ||
    window.location.protocol === 'file:';
  return !isStaticHost;
}

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
    const isStaticHost =
      typeof window !== 'undefined' &&
      (window.location.hostname.endsWith('github.io') ||
        window.location.protocol === 'capacitor:' ||
        window.location.protocol === 'file:');

    if ((res.status === 404 || res.status === 405) && isStaticHost && !CONFIGURED_BASE) {
      throw new Error(
        'GitHub Pages hosts only the static interface and cannot run the AI solver server (HTTP 405). Open your deployed AI Studio app URL directly, or set the VITE_API_BASE_URL variable to your backend server URL and rebuild.'
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
