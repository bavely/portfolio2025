// Client IP extraction, used to key rate limits.
//
// These headers are set by the hosting proxy and are spoofable if requests can
// reach the app without passing through it — so treat the result as a
// best-effort abuse-mitigation key, never as an identity or an access control.

const FALLBACK = "unknown";

function firstForwardedFor(value: string | null) {
  if (!value) return null;
  // `x-forwarded-for` is a comma-separated chain; the client is the first entry.
  const first = value.split(",")[0]?.trim();
  return first || null;
}

/** For route handlers, which have the incoming `Request`. */
export function clientIpFromRequest(request: Request) {
  return (
    firstForwardedFor(request.headers.get("x-forwarded-for")) ??
    request.headers.get("x-real-ip") ??
    FALLBACK
  );
}

/** For server actions, which read headers from context. */
export function clientIpFromHeaders(headerList: Headers) {
  return (
    firstForwardedFor(headerList.get("x-forwarded-for")) ??
    headerList.get("x-real-ip") ??
    FALLBACK
  );
}
