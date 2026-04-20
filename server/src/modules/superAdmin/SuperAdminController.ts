import {Request,Response} from 'express'
import {createAdminService} from '../superAdmin/SuperAdminService'
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