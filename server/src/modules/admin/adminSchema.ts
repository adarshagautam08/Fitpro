import {z} from 'zod'
export const createTrainerSchema=z.object({
    name:z.string().min(1,"Name is required "),
    email:z.string().email("Invalid Email"),
    password:z.string().min(6,"Password too short")
})
export const createPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  durationDays: z.coerce.number().int().positive("Duration must be a positive number")
})