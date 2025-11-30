// app/api/jobs/route.ts
import jobQueries from "@/db/queries/jobs";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { validateJobRequiredFields } from "@/lib/data-validator";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
  
  const params = request.nextUrl.searchParams;
  const countOnly = params.get("countOnly") === "true";
  // check if the request only asks for count
  if(countOnly){
    const count = await jobQueries.getActiveJobsCount(session.user.id);
    return NextResponse.json({ count });
  }

  // if the request asks for jobs
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "10");

  try {
    const result = await jobQueries.getJobs(page, limit, session.user.id);
    
    // Return the proper structure
    return NextResponse.json(result);
  } catch (error: any | Error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

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


