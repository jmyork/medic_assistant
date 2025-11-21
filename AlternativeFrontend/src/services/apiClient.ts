const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? '127.0.0.1:3030/';

type Params = Record<string, string | number | boolean>;

function buildUrl(path: string, params?: Params) {
    const url = new URL(path, API_BASE);
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    return url.toString();
}

async function request<T = any>(
    method: string,
    path: string,
    options?: { params?: Params; body?: any; headers?: Record<string, string> }
): Promise<T> {
    const url = buildUrl(path, options?.params);

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
    };

    const res = await fetch(url, {
        method,
        headers,
        body: options?.body != null ? JSON.stringify(options.body) : undefined,
    });

    const text = await res.text();
    const content = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const err: any = new Error(content?.message ?? res.statusText);
        err.status = res.status;
        err.body = content;
        throw err;
    }

    return content as T;
}

export const api = {
    get: <T = any>(path: string, params?: Params, headers?: Record<string, string>) =>
        request<T>('GET', path, { params, headers }),
    post: <T = any>(path: string, body?: any, params?: Params, headers?: Record<string, string>) =>
        request<T>('POST', path, { body, params, headers }),
    put: <T = any>(path: string, body?: any, params?: Params, headers?: Record<string, string>) =>
        request<T>('PUT', path, { body, params, headers }),
    del: <T = any>(path: string, params?: Params, headers?: Record<string, string>) =>
        request<T>('DELETE', path, { params, headers }),
    rawRequest: request,
};

export type { Params };
