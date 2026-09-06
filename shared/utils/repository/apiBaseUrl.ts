/**
 * API のベース URL を返す。
 */
export function apiBaseUrl(): string {
  const isServer = typeof window === "undefined";

  if (isServer && process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL ?? "";
}
