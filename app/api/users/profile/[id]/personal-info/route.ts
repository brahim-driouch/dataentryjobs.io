import userQueries from "@/db/queries/users";
import { auth } from "@/lib/auth";
import { createDotNotationUpdate } from "@/lib/create-dot-notation-update";
import { IPersonalInfo } from "@/types/profile";
import { NextResponse } from "next/server";

  export async function PATCH(request: Request,{params}: {params: Promise<{id: string}>}) {
    try {
        const session = await auth();

        if(!session){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const {id} = await params;
        if(!id){
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }
        const body = await request.json();
        console.log("body:",body);
        if(!body){
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
               // user can not change email and name for now

        if(body.email !== session.user?.email.trim() || body.full_name.trim() !== session.user?.name.trim()){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        
        const profileExist = userQueries.getProfileByUserId(id);
        if(!profileExist){
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }
       const formatedData = createDotNotationUpdate(body,"",{skipNull:true,skipUndefined:true,skipEmptyStrings:true});
       const updated = userQueries.updatePersonalInfo(id, formatedData as IPersonalInfo);
       if(!updated){
           return NextResponse.json({ error: "Profile not updated" }, { status: 404 });
       }

       return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}