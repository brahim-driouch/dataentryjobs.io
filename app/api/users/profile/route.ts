import userQueries from "@/db/queries/users";
import { NextResponse } from "next/server";




export async function GET(request: Request,{params}: {params: Promise<{id: string}>}) {
    
    try {
        const {id} = await params;
        if(!id){
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const profile = userQueries.getProfileById(id);
        if(!profile){
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}