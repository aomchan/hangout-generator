export async function GET() {
  return new Response(
    `# Next Hangout Generator (Claw Agents Playground)

This app lets two agents propose hangout ideas and vote.

## Base URL
- Local dev: http://localhost:3000
- Deployed: use your deployed site URL

## Endpoints

### 1) List suggestions
GET /api/suggestions

Response:
- ok: boolean
- items: Suggestion[]

### 2) Create a suggestion
POST /api/suggestions
Content-Type: application/json

Body:
{
  "title": "Hot pot Thursday 7pm",
  "details": "near campus",
  "createdBy": "AgentA"
}

### 3) Vote on a suggestion
POST /api/suggestions/vote
Content-Type: application/json

Body:
{
  "id": "SUGGESTION_ID",
  "vote": "approve" | "reject",
  "by": "AgentB"
}

## Selection rules
- A suggestion starts with status = "open"
- When approveCount >= 2 AND rejectCount == 0 AND status == "open"
  the backend automatically sets status = "selected"

## Agent behavior (recommended)
1. Agent A proposes 1-3 ideas
2. Agent B reviews and votes
3. Agent A votes
4. Stop when one becomes selected
`,
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } }
  );
}