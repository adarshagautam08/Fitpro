import { TransformStreamDefaultController } from "stream/web";
import prisma from "../../lib/prisma"
import bcrypt from "bcrypt";
//creating the workout 
export const createWorkoutService=async(title:string,description:string,trainerId:string)=>
{    
    const createdWorkout=await prisma.workoutPlan.create({
        data:{
            title:title,
            description:description,
            trainerId:trainerId
        }
    })
    return createdWorkout
}

//gettting all the workout plan created by the trainer
export const getAllPlanService=async(trainerId:string)=>
{
    const getAllPlan=await prisma.workoutPlan.findMany({
        where:{
            trainerId:trainerId
        }
    })
    if(!getAllPlan)
    {
        throw new Error("Doesnt have any plans")

    }
    return getAllPlan
}
//assigning the workout plan to the members 
export const assignWorkoutService=async(memberId:string,planId:string,trainerId:string)=>
{
    const checkplans=await prisma.workoutPlan.findFirst({
        where:{
            trainerId:trainerId
        }
    })
    if(!checkplans)
    {
        throw new Error("Plan doesnt exist ")
    }
    const existing = await prisma.workoutAssignment.findFirst({
    where: { memberId, planId }
    })
    if (existing) {
    throw new Error("This plan is already assigned to this member")
    }
    const assignWorkout=await prisma.workoutAssignment.create({
        data:{
            memberId:memberId,
            planId:planId
        }
    })
    return assignWorkout
}
//creating the availability of the trainer 
export const addAvailabilityService=async(trainerId:string,date:Date)=>
{
    const addedAvailability=await prisma.trainerAvailability.create({
        data:{
            trainerId:trainerId,
            date
        }
    })
    return addedAvailability
}