import prisma from "../../lib/prisma"
export const viewAllPlansService=async(memberId:string)=>
{
    const getAllPlans=await prisma.workoutAssignment.findMany({
        where:{
            memberId:memberId
        },
        include:{
            plan:true
        }
    })
    return getAllPlans
}