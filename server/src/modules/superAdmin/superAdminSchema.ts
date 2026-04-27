import {z} from 'zod'
export const createAdminSchema=z.object({
      name:z.string().min(1,"Name is required "),
    email:z.string().email("Invalid Email"),
    password:z.string().min(6,"Password too short")
})
