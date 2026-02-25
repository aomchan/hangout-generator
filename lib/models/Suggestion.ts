import { Schema, model, models } from "mongoose";

const SuggestionSchema = new Schema(
  {
    title: { type: String, required: true },
    details: { type: String, default: "" },
    createdBy: { type: String, required: true },
    status: { type: String, enum: ["open", "selected", "rejected"], default: "open" },
    approveCount: { type: Number, default: 0 },
    rejectCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Suggestion =
  models.Suggestion || model("Suggestion", SuggestionSchema);