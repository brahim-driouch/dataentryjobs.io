import {  verifyUserToken } from "@/lib/jwt";
import { NextResponse } from "next/server";



export async function GET(request: Request) {

    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if(!token){
        return NextResponse.json({error:"No token provided"}, {status:400});
    }
    try {
        const result = await verifyUserToken(token);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error:"Invalid token"}, {status:400});
    }
}
