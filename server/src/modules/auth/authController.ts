import { Request, Response } from 'express'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginService,refreshService } from './authService'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(403).json({ message: 'Email does not exist' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Wrong credentials' })

    const { accessToken, refreshToken } = loginService(user.id, user.role)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({ message: 'Login successful', accessToken })
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

//controller for the refreshToken 
export const refreshToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    if (!process.env.JWT_REFRESH_TOKEN || !process.env.JWT_ACCESS_TOKEN) {
      return res
        .status(500)
        .json({ message: "JWT secrets not configured" });
    }
    const {accessToken}=refreshService(token)

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};