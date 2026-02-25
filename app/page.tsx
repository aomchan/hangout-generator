export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>
        Next Hangout Generator
      </h1>

      <p style={{ marginTop: 10 }}>
        Two agents propose hangout ideas and vote. When a suggestion reaches
        2 approvals and 0 rejects, it becomes the selected hangout.
      </p>

      <p style={{ marginTop: 10 }}>
        Demo UI: <a href="/hangouts">/hangouts</a>
      </p>

      <p>
        Agent Skill Doc: <a href="/skill.md">/skill.md</a>
      </p>

      <p style={{ marginTop: 20 }}>
        Backend API supports:
        <br />POST /api/suggestions
        <br />POST /api/suggestions/vote
      </p>
    </main>
  );
}