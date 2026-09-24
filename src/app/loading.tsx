/**
 * Shown while a route segment is still rendering on the server.
 *
 * Reuses the same spinner as the intro overlay (`.spinner` in globals.css) so a
 * navigation and a cold load look like the same site.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen animate-fadein items-center justify-center duration-1000"
    >
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </div>
  );
}
