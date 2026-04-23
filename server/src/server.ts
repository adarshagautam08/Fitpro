import express from 'express'
import authRoute from './modules/auth/authRoute'
import cors from 'cors'
import dotenv from 'dotenv'
import superAdminRoute from './modules/superAdmin/SuperAdminRoute'
import adminRoutes from './modules/admin/adminRoute'
import trainerRoute from './modules/trainer/trainerRoute'
import memberRoute from './modules/member/memberRoute'
dotenv.config()
const app=express()

app.use(express.json())

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})
//api for the login
app.use('/auth',authRoute)
app.use('/superAdmin',superAdminRoute)
app.use('/admin',adminRoutes)
app.use('/trainer',trainerRoute)
app.use('/member',memberRoute)


app.listen(5000, () => {
  console.log('Server running on port 5000')
})


