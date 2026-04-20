import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
export const createAdminService=async(name:string,email:string,password:string)=>
{
     const checkEmail=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(checkEmail)
        {
             throw new Error('Email already exists')
        }
        //hasing the password 
        const hashedpassword=await bcrypt.hash(password,10)
        const Admin=await prisma.user.create({
            data:{  
                name:name,
                email:email,
                password:hashedpassword,
                role:'ADMIN'
            }
        })
        return Admin
}