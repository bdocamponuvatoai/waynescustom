"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section notfound" id="main">
      <p className="eyebrow">SOMETHING STALLED.</p>
      <h1>
        LET’S TRY
        <br />
        THAT AGAIN.
      </h1>
      <div className="error-actions">
        <button type="button" className="button" onClick={reset}>
          Try again ↻
        </button>
        <Link className="outline-button" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
