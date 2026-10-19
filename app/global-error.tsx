"use client";

// Last-resort boundary for errors in the root layout. It replaces the whole
// document, so it cannot rely on globals.css or the site shell.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#151515",
          color: "#f0eee8",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <main>
          <h1 style={{ fontSize: 40, margin: "0 0 16px" }}>Something stalled.</h1>
          <p style={{ margin: "0 0 28px", color: "#a8a6a0" }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#d6301f",
              color: "#fff",
              border: 0,
              borderRadius: 2,
              padding: "16px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
