import { Request, Response } from "express-serve-static-core";
import { createTrainerService,createMemberService } from "../admin/adminService";
export const createTrainer = async (req: Request, res: Response) => {
  //try catch block
  try {
    //data from the body
    const { name, email, password } = req.body;
    const adminId = req?.user?.id;
    if (!adminId) {
      return res.status(401).json({ message: "only admin can create trainer  " });
    }
    //validating
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields are empty" });
    }
    
    //check if the email alrady exist or not
    const trainer =await createTrainerService(name, email, password, adminId);
    return res.status(200).json({ message: "Trainer created sucessfully",trainer });
  } catch (err:any) {
    return res.status(500).json({message:err.message})
  }
};




export const createMember=async(req:Request,res:Response)=>
{
  try{
    const {name,email,password}=req.body
    const adminId=req.user?.id

    if(!adminId)
    {
      return res.status(401).json("Only admin can create member ")
    }
    if(!name||!email||!password)
    {
      return res.status(400).json({message:"The fields are empty "})
    }
    
    const member=await createMemberService(name,email,password,adminId)
    return res.status(200).json({message:"Member created sucessfully",member})
  }
  catch(err:any)
  {
    return res.status(500).json({message:err.message})
  }
}
