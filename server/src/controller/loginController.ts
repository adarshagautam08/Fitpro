import prisma from '../lib/prisma'
import {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login=async(req:Request,res:Response)=>
{
    try{
        const {email,password}=req.body
        //check if the email exist or not 
        const checkEmail=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!checkEmail)
        {
            return res.status(403).json({message:"email doesnt exist "})
        }
        
        // if there is email then  hash password 
        const decoded=await bcrypt.compare(password,checkEmail.password)
        if(!decoded)
        {
            return res.status(401).json({message:"credential are wrong"})
        }
        //providing the refersh and access token during login and saving in the cookies 
        const accessToken=jwt.sign(
            {id: checkEmail.id, role: checkEmail.role},
            process.env.JWT_ACCESS_TOKEN!,
            {expiresIn:"15m"}
        )
        const refreshToken=jwt.sign(
            {id: checkEmail.id, role: checkEmail.role},
            process.env.JWT_REFRESH_TOKEN!,
            {expiresIn:'1d'}

        )
        //set the refresh token in the cookies 
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'strict',
            maxAge:24*60*60*1000
        })

        return res.status(200).json({message:"Login successful",accessToken})

    }
    catch(err:any)
    {
        return res.status(500).json({message:"Internal server error"})
    }
}