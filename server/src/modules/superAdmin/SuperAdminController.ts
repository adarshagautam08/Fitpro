import {Request,Response} from 'express'
import {createAdminService,deleteAdminService} from '../superAdmin/SuperAdminService'
//creating the admin 
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Fields are empty' })

    const admin = await createAdminService(name, email, password)
    return res.status(201).json({ message: 'Admin created successfully', user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } })
  } catch (err: any) {
    return res.status(400).json({ message: err.message })
  }
}

//for deleting the admin
export const deleteAdmin=async(req:Request,res:Response)=>
{
  try{
    const adminId=req.params.id as string
    const superAdminId=req.user?.id
    if(!adminId)
    {
      return res.status(400).json({message:"Doesnt have the adminid in the request "})
    }
    if(!superAdminId)
    {
      return res.status(401).json({message:"Doesnt have the SuperAdmin id"})
    }
    const deletedAdmin=await deleteAdminService(adminId,superAdminId)
    return res.status(200).json({message:"Sucessfully deleted the admin"})
  }
  catch(err:any)
  {
   return res.status(500).json({message:err.message}) 
  }
}