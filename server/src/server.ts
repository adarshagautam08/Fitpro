import express from 'express'
const app=express()
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})
app.listen(5000, () => {
  console.log('Server running on port 5000')
})


