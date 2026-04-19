import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if(!user.role)
      {
        return res.status(400).json({message:"unauthorized role"})
      }
      if (!allowedRole.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden - Access denied" });
      }
     
      
      next();
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};