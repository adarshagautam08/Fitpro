import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN
    ) as { id: string; role: string };

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};