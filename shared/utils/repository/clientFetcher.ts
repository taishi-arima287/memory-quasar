type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetcherOptions<Request> {
  uri: string;
  method: HttpMethod;
  body?: Request;
}

interface FetcherResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export class FetcherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetcherError";
  }
}

export async function clientFetcher<Response, Request = undefined>({
  uri,
  method,
  body,
}: FetcherOptions<Request>): Promise<FetcherResponse<Response>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${uri}`, {
      method,
      headers,
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    return {
      ok: response.ok,
      data: response.ok ? data : undefined,
      error: !response.ok ? data.message : undefined,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "予期せぬエラーが発生しました");
  }
}
