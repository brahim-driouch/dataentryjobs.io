import jobQueries from "@/db/queries/jobs";
import { NextResponse } from "next/server";





export async function POST(request:  Request) {
    
    try {
        const body = await request.json();

        const job = await jobQueries.createJob(body);

        return NextResponse.json(job);
         
        
    } catch (error: any | Error) {
        return NextResponse.json({ error: 
            error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
    }
}