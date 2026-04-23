import { Request,Response } from "express-serve-static-core"
import{viewAllPlansService} from './memberService'
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