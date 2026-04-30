// hooks/useAdmins.ts
"use client"
import { useState, useEffect } from 'react'
import { getAllAdmins } from '@/lib/services/superAdminService'

export const useAdmins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAdmins = async () => {
    try {
      const data = await getAllAdmins()
      setAdmins(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return { admins, loading, error, refetch: fetchAdmins }
}