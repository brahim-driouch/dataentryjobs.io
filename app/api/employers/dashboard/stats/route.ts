import statsQueries from "@/db/queries/stats";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";




export async function GET() {
   try {
    const session = await auth();
    if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
     const [activeJobsCount,totalAplicationsCount,upComingInterviewsCount,hiredThisMonthCount] =await Promise.all(
        [
            statsQueries.getActiveJobsCount(session.user.id),
            statsQueries.getTotalApplicationsCount(session.user.id),
            statsQueries.getUpcomingInterviewsCount(session.user.id),
            statsQueries.getHiredThisMonthCount(session.user.id)
        ]
    )
    return NextResponse.json({
        activeJobsCount,
        totalAplicationsCount,
        upComingInterviewsCount,
        hiredThisMonthCount
    })    
   } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
    
}