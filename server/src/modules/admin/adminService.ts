import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

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
  console.log("hello")
  
  //check if the email exist or not
  if (checkEmail) {
    throw new Error("Email already exists");
  }
  console.log("hello1")
  
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

export const createMemberService=async(name:string,email:string,password:string,adminId:string)=>
{
  //check if the there is any existing member
  const checkEmail=await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  if(checkEmail)
  {
    throw new Error("Email already existed")
  }
  const hashedPassword=await bcrypt.hash(password,10)
  const member=await prisma.user.create({
    data:{
      name:name,
      email:email,
      password:hashedPassword,
      adminId:adminId,
      role:"MEMBER"
    },
  });
  return member

}