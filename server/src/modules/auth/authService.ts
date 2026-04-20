import jwt from 'jsonwebtoken'

export const loginService = (id: string, role: string) => {
  const accessToken = jwt.sign(
    { id, role },
    process.env.JWT_ACCESS_TOKEN!,
    { expiresIn: '15m' }
  )
  const refreshToken = jwt.sign(
    { id, role },
    process.env.JWT_REFRESH_TOKEN!,
    { expiresIn: '1d' }
  )
  return { accessToken, refreshToken }
}

export const refreshService=(token:string)=>
{
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN!
    ) as unknown as  { id: string; role: string };

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_ACCESS_TOKEN!,
      { expiresIn: "15m" }
    );
    return {accessToken}   
}