// hooks/useAdmins.ts
"use client"
import { useState, useEffect } from 'react'
import { getAllAdmins } from '@/lib/services/superAdminService'

export const useAdmins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getAllAdmins()
      .then(data => setAdmins(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { admins, loading, error }
}