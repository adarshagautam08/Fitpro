import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
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
app.use('/auth/login',)
app.listen(5000, () => {
  console.log('Server running on port 5000')
})


