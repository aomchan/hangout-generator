import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";
import { Suggestion } from "@/lib/models/Suggestion";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { id, vote } = body; // vote: "approve" | "reject"

  if (!id || (vote !== "approve" && vote !== "reject")) {
    return NextResponse.json({ ok: false, error: "Need id and vote=approve|reject" }, { status: 400 });
  }

  await connectMongo();

  const inc = vote === "approve" ? { approveCount: 1 } : { rejectCount: 1 };
  const doc = await Suggestion.findByIdAndUpdate(id, { $inc: inc }, { new: true });

  if (!doc) return NextResponse.json({ ok: false, error: "Suggestion not found" }, { status: 404 });

  // super simple auto-select rule:
  // if approveCount >= 2 and rejectCount === 0 => selected
  if (doc.approveCount >= 2 && doc.rejectCount === 0 && doc.status === "open") {
    doc.status = "selected";
    await doc.save();
  }

  return NextResponse.json({ ok: true, item: doc });
}