"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Download, Check } from "lucide-react";
const kinds = ["Custom automotive", "Automotive care", "Towing"] as const;
type Kind = (typeof kinds)[number];

export default function Planner() {
  const [kind, setKind] = useState<Kind>("Custom automotive");
  const [vehicle, setVehicle] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [ready]);
  const summary = `WAYNE’S CUSTOMS — PERSONAL REQUEST NOTES\n\nService: ${kind}\nVehicle: ${vehicle}\nLocation: ${location}\n\n${details}\n\nThese notes have not been sent. This is not a booking or dispatch confirmation.`;
  function submit(e: FormEvent) {
    e.preventDefault();
    setReady(true);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "waynes-request-notes.txt";
    a.click();
    // Safari and Firefox can cancel the download if the URL is revoked synchronously.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Your notes were downloaded. Nothing has been sent to the business.");
  }
  return (
    <div className="planner">
      <div className="planner-top">
        <span>YOUR NEXT MOVE</span>
        <span>0{ready ? "2" : "1"} / 02</span>
      </div>
      {!ready ? (
        <form onSubmit={submit}>
          <h2 ref={headingRef} tabIndex={-1}>
            What’s on your mind?
          </h2>
          <p>Make a clear brief for your vehicle or project.</p>
          <fieldset>
            <legend>I’m interested in</legend>
            <div className="choices">
              {kinds.map((s) => (
                <label className={kind === s ? "active" : ""} key={s}>
                  <input
                    type="radio"
                    name="kind"
                    checked={s === kind}
                    onChange={() => setKind(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            Your vehicle
            <input
              required
              maxLength={120}
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="Year, make and model"
            />
          </label>
          <label>
            {kind === "Towing" ? "Pickup location / destination" : "Your town or city"}
            <input
              required
              maxLength={200}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={
                kind === "Towing" ? "Where is the vehicle, and where is it going?" : "Town or city"
              }
            />
          </label>
          <label>
            {kind === "Towing" ? "Vehicle condition and access" : "Tell us about the project"}
            <textarea
              required
              minLength={10}
              maxLength={3000}
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Your goals, questions, or the details that matter."
            />
          </label>
          <button className="button" type="submit">
            Create my summary <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </form>
      ) : (
        <div>
          <h2 ref={headingRef} tabIndex={-1}>
            Your ideas. In one place.
          </h2>
          <p>Keep this summary for your conversation with the business.</p>
          <pre>{summary}</pre>
          <div className="planner-buttons">
            <button type="button" className="button" onClick={download}>
              <Download size={17} aria-hidden="true" /> Download notes
            </button>
            <button
              type="button"
              className="outline-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(summary);
                  setNotice("Copied to clipboard. Your request has not been sent.");
                } catch {
                  setNotice("Copy is unavailable. Use Download notes instead.");
                }
              }}
            >
              <Copy size={17} aria-hidden="true" /> Copy
            </button>
          </div>
          <button
            type="button"
            className="edit"
            onClick={() => {
              setReady(false);
              setNotice("");
            }}
          >
            ← Edit details
          </button>
        </div>
      )}
      <p className="planner-disclaimer">
        <Check size={14} aria-hidden="true" /> Notes stay in this page until you copy or download
        them. This tool does not send requests, book appointments, or dispatch towing.
      </p>
      {/* Always mounted so assistive tech registers the live region before it changes. */}
      <p role="status" className={notice ? "notice" : "visually-hidden"}>
        {notice}
      </p>
      <noscript>
        <p>
          JavaScript is needed for this planner. It creates notes only and does not send requests.
        </p>
      </noscript>
    </div>
  );
}
