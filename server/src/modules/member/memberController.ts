import { Request,Response } from "express-serve-static-core"
import{viewAllPlansService,getTrainerAvailabilityService,sessionBookService,addAttendenceService,getAllSessionService,getAttendenceService} from './memberService'
export const viewAllPlans=async(req:Request,res:Response)=>
{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"Didnt get the memberId in request "})
        }
        const getAllPlans=await viewAllPlansService(memberId)
        return res.status(201).json(getAllPlans)
    }   
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    } 
}
//get trainer who are availabible 
export const getTrainerAvailability=async(req:Request,res:Response)=>
{
    try{
        
        const trainerId=req.params.id as string
        if(!trainerId)
        {
            return res.status(400).json({message:"Request doesnt have memberid"})
        }
        const trainerAvailable=getTrainerAvailabilityService(trainerId)
        return res.status(200).json(trainerAvailable)

    }
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    }
}
//book the session 
export const sessionBook=async(req:Request,res:Response)=>{
    try{
        const {trainerId,date}=req.body
        const memberId=req.user?.id as string
        if(!trainerId||!date){
            return res.status(400).json({message:"Request body is empty"})
        }
        if(!memberId)
        {
            return res.status(401).json({message:"didnt get the memberid in the req params "})
        }
        const bookedSession=sessionBookService(trainerId,date,memberId)
        return res.status(200).json({message:"Created Sucessfully",bookedSession})
    }
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    }
}
//get all the sessionBooked
export const getAllSession=async(req:Request,res:Response)=>
{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"request doesnt have the memberId"})
        }
        const getSession=getAllSessionService(memberId)
        return res.status(200).json({getSession})
    }
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    }
}
//add attendence 
export const addAttendence =async(req:Request,res:Response)=>{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"Unauthorized "})
        }
        const attendence=await addAttendenceService(memberId)
        return res.status(201).json({message:"Added attendence",attendence})
    }
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    }
}
//get the attendence
export const getAttendence=async(req:Request,res:Response)=>
{
    try{
        const memberId=req.user?.id as string
        if(!memberId)
        {
            return res.status(400).json({message:"Unauthorized"})
        }
        const getAttendence=getAttendenceService(memberId)
        return res.status(200).json({getAttendence})
    }
    catch(err:any)
    {
        return res.status(500).json({message:err.message})
    }
}