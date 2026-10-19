import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section notfound" id="main">
      <p className="eyebrow">404 / WRONG TURN.</p>
      <h1>
        BACK ON
        <br />
        TRACK.
      </h1>
      <Link className="button" href="/">
        Return home ↗
      </Link>
    </main>
  );
}
