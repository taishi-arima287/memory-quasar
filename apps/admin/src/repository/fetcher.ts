type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetcherOptions<Request> {
  uri: string;
  method: HttpMethod;
  body?: Request;
  token?: string;
}

export async function fetcher<Response, Request = undefined>({
  uri,
  method,
  body,
}: FetcherOptions<Request>): Promise<Response> {
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
    return response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}
