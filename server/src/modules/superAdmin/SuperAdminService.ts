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

export const deleteAdminService=async(adminId:string,superAdmin:string)=>
{
    //check if the id having admin exist or not 
    const checkAdmin=await prisma.user.findUnique({
        where:{
            id:adminId
        }
    })
    if(!checkAdmin)
    {
        throw new Error("Admin doesnt exist ")
    }
    await prisma.user.deleteMany({
       where: { adminId: adminId }
    })
    const deleteAdmin=await prisma.user.delete({
        where:{
            id:adminId
        }
    })
    return deleteAdmin
}