import { Role } from "@prisma/client";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

//for creating trainer
export const createTrainerService = async (
  name: string,
  email: string,
  password: string,
  adminId: string,
) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("hello");

  //check if the email exist or not
  if (checkEmail) {
    throw new Error("Email already exists");
  }
  console.log("hello1");

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const createTrainer = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: "TRAINER",
      adminId: adminId,
    },
  });
  return createTrainer;
};



//for creating member
export const createMemberService = async (
  name: string,
  email: string,
  password: string,
  adminId: string,
) => {
  //check if the there is any existing member
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    throw new Error("Email already existed");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const member = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      adminId: adminId,
      role: "MEMBER",
    },
  });
  return member;
};


//for getting all trainer
export const allUsersService = async (role: string) => {
  const allUsers = await prisma.user.findMany({
    where: {
      role:role as Role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      adminId: true,
      createdAt: true,
    },
  });
  if (allUsers.length === 0) {
  throw new Error("No members found")
}
  return allUsers;
};


export const userByIdService=async(userId:string,adminId:string,)=>{
  //check if the user exist or not 
  const checkUser=await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{
      id:true,
      name:true,
      email:true,
      adminId:true,
      role:true,

    }
  })

  if (!checkUser) {
  throw new Error("User not found")
}


  if(checkUser.adminId!==adminId)
  {
    throw new Error("You are not authorized to get this user ")
  }
  return checkUser
}

//for deleting the user(trainer/member)
export const deletedUserService=async(adminId:string,userId:string)=>
{
  //first check if the trainer exist or not by 
  const  checkUser=await prisma.user.findUnique({
    where:{
      id:userId
    }
  })
  if(!checkUser)
  {
    throw new Error("User with this id  doesnt exist")

  }

  //check if the adminid of the trainer and the admin trying to delete is same or not
  if(checkUser.adminId!==adminId)
  {
    throw new Error("You are not authorized to delete this adminid")
  }
   const deletedUser=await prisma.user.delete({
    where:{id:userId},
   })
   return deletedUser
  }
 