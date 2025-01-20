// サーバー用
import { cookies } from "next/headers";

export async function serverFetcher<Response, Request = undefined>({
  uri,
  method,
  body,
}: {
  uri: string;
  method: string;
  body?: Request;
}): Promise<Response> {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    credentials: "same-origin",
    cache: "no-store",
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error("予期せぬエラーが発生しました");
  }

  return response.json();
}
