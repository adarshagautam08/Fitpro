'use client'
import { useForm } from 'react-hook-form'
import { createAdmins } from '@/lib/services/superAdminService'

type Props = {
  onClose: () => void
   onSuccess: () => void
}

type AdminForm = {
  name: string
  email: string
  password: string
}

export default function CreateAdminForm({ onClose,onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminForm>()
  
  const onSubmit = async (data: AdminForm) => {

    try {
      await createAdmins(data)
      onSuccess() 
      onClose()
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to create admin")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Enter name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Enter password"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Admin"}
        </button>
      </div>
    </form>
  )
}