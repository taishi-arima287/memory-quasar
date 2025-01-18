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

export async function fetcher<Response, Request = undefined>({
  uri,
  method,
  body,
}: FetcherOptions<Request>): Promise<FetcherResponse<Response>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`http://localhost:8080${uri}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      credentials: "include",
    });

    const data = await response.json();

    return {
      ok: response.ok,
      data: response.ok ? data : undefined,
      error: !response.ok ? data.message : undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: (error as Error).message,
    };
  }
}
