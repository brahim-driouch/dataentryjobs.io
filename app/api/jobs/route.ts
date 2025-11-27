import jobQueries from "@/db/queries/jobs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { validateJobRequiredFields } from "@/lib/data-validator";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const { isValid } = validateJobRequiredFields(body);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid job data" }, { status: 400 });
    }
    const job = await jobQueries.createJob(body);

    return NextResponse.json(job);
  } catch (error: any | Error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
