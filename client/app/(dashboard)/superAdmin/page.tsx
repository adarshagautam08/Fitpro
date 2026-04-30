"use client";
import { useState } from 'react'
import AdminStatCard from "@/components/superAdmin/AdminStatCard";
import AdminForm from "@/components/superAdmin/AdminTable";
import CreateAdminForm from "@/components/superAdmin/CreateAdminForm";
import Modal from "@/components/ui/Modal";
import { useAdmins } from "@/hooks/useAdmins";

export default function SuperAdmin() {
  const { admins, loading, error,refetch } = useAdmins()
  const [open, setOpen] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="min-h-screen p-6">
      <AdminStatCard count={admins.length} onAdd={() => setOpen(true)} />
      <AdminForm admins={admins} onSuccess={refetch}  />
      <Modal open={open} onClose={() => setOpen(false)} title="Create Admin">
        <CreateAdminForm onClose={() => setOpen(false)} onSuccess={refetch} />
      </Modal>
    </div>
  )
}