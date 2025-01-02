'use client'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect } from "react"

export function Offcanvas({ open, onClose, children, position = 'center', className }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null // 當 Offcanvas 關閉時不渲染任何內容

  const positionClasses = {
    right: 'right-0 translate-x-full',
    left: 'left-0 -translate-x-full',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto max-h-[90vh]'
  }

  const transitionClasses = {
    right: 'translate-x-0',
    left: 'translate-x-0',
    center: 'translate-x-[-50%] translate-y-[-50%] scale-100 opacity-100'
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Offcanvas */}
      <div
        className={cn(
          "fixed w-full max-w-md bg-white shadow-lg z-[101] transition-all duration-300 ease-in-out rounded-lg",
          position === 'center' ? 'overflow-y-auto' : 'h-screen',
          transitionClasses[position],
          positionClasses[position],
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </>
  )
} 