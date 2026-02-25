import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";
import { Suggestion } from "@/lib/models/Suggestion";

export async function GET() {
  await connectMongo();
  const items = await Suggestion.find().sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { title, details, createdBy } = body;

  if (!title || !createdBy) {
    return NextResponse.json(
      { ok: false, error: "Missing title or createdBy" },
      { status: 400 }
    );
  }

  await connectMongo();

  const doc = await Suggestion.create({
    title: String(title),
    details: details ? String(details) : "",
    createdBy: String(createdBy),
  });

  return NextResponse.json({ ok: true, item: doc });
}