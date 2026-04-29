import axios from 'axios'
import { getAccessToken, setAccessToken } from './auth'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// attach token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handle 401 - refresh token   
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`, {}, { withCredentials: true })
      setAccessToken(res.data.accessToken)
      error.config.headers.Authorization = `Bearer ${res.data.accessToken}`
      return axios(error.config) // retry original request
    }
    return Promise.reject(error)
  }
)

export default api