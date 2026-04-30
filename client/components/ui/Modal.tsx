// components/ui/Modal.tsx
type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0  bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl ml-auto"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}