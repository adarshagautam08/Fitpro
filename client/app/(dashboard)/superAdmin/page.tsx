"use client";

import AdminStatCard from "@/components/superAdmin/AdminStatCard";
import AdminForm from "@/components/superAdmin/AdminTable";
import { useAdmins } from "@/hooks/useAdmins";

export default function SuperAdmin() {
  const{admins, loading, error }=useAdmins()
  const counts=admins.length

    if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <AdminStatCard count={counts} />
      <AdminForm admins={admins}/>
    </>
  );
}
