// app/(dashboard)/layout.tsx
'use client'
import Navbar from '@/components/navBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-gray-50">
      <Navbar />
      <main className="p-6 h-[90%] bg-gray-100 ">
        {children}
      </main>
    </div>
  )
}