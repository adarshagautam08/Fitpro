import {Request,Response} from 'express'
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'
export const createAdmin=async(req:Request,res:Response)=>
{
    //take the email and password from the admin 
    try{
        const {name,email,password,role}=req.body
        console.log(name,email,password,role)
        //check if the data is empty or not 
        if(!name||!email||!password||!role)
        {
            return res.status(401).json({message:"the fields are empty "})
        }
        //check if the email alredy exist or not 
        const checkEmail=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(checkEmail)
        {
            return res.status(401).json({message:"Email already exist"})
        }
        //hasing the password 
        const hashedpassword=await bcrypt.hash(password,10)
        const createAdmin=await prisma.user.create({
            data:{  
                name:name,
                email:email,
                password:hashedpassword,
                role:role
            }
        })
        return res.status(200).json({message:"Sucessfully created admin ",createAdmin})
    }
    catch(err)
    {
        return res.status(500).json("Internal server error")
    }
}