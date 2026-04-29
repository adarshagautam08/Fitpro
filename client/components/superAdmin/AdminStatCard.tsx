"use client";
type Props = {
  count: number
}
export default function AdminStatCard({count}:Props) {
    console.log(count)
  return (
     <div className="bg-white border rounded-lg p-6 w-48">
      <p className="text-sm text-gray-800">Total Admins</p>
      <p className="text-3xl font-semibold text-black mt-1">{count}</p>
    </div>
  );
}
