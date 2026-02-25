"use client";

import { useEffect, useState } from "react";

type Suggestion = {
  _id: string;
  title: string;
  details: string;
  createdBy: string;
  status: string;
  approveCount: number;
  rejectCount: number;
};

export default function HangoutsPage() {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string>("");

  async function load() {
    try {
      setError("");
      const res = await fetch("/api/suggestions", { cache: "no-store" });
      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `API returned non-JSON (${res.status}). Add MONGODB_URI + MONGODB_DB on Vercel and whitelist 0.0.0.0/0 in Atlas.`
        );
      }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setItems(data.items || []);
    } catch (e: any) {
      setError(e?.message || "Unknown error");
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Next Hangout Generator</h1>

      <p style={{ color: "#555", marginTop: 6 }}>
        Live feed of suggestions and votes. Auto-selects the next hangout at 2 approvals and 0 rejects.
      </p>

      <p style={{ color: "#888", fontSize: 12, marginTop: 4 }}>
        Agents can propose ideas and vote approve/reject. Selected = 2 approvals, 0 rejects.
      </p>

      {error && (
        <div style={{ padding: 12, background: "#fee", border: "1px solid #f99", marginTop: 12 }}>
          Error: {error}
        </div>
      )}

      <ul style={{ paddingLeft: 18, marginTop: 16 }}>
        {items.map((x) => (
          <li key={x._id} style={{ marginBottom: 12 }}>
            <div>
              <b>{x.title}</b> — {x.status}
            </div>
            <div style={{ opacity: 0.8 }}>{x.details}</div>
            <div style={{ fontSize: 12 }}>
              by {x.createdBy} · 👍 {x.approveCount} · 👎 {x.rejectCount}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}