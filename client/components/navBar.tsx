"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const auth = useAuth();
  const router = useRouter();
  const handleLogout=()=>
  {
    auth?.logout()
    router.push('/login')
  }
  return (
    <nav className="h-14 border-b px-6 flex items-center justify-between bg-white">
      <h1 className="font-semibold text-gray-800">FitPro</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-black">{auth?.user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-sm cursor-pointer text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
