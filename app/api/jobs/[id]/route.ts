import jobQueries from "@/db/queries/jobs";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { validateJobRequiredFields } from "@/lib/data-validator";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Get authenticated session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Validate ObjectId format
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
  }

  try {
    const job = await jobQueries.getJobById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Optional: Check if the employer owns this job
    if (job.employer_id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(job, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Internal Server Error" 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid job id" }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Validate
    const { isValid, errors } = validateJobRequiredFields(body);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid job data", errors }, { status: 400 });
    }

    // Check ownership before update
    const existingJob = await jobQueries.getJobById(id);
    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (existingJob.employer_id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update job
    const updatedJob = await jobQueries.updateJob(body);

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}