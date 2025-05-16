import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return {
    closeModal,
    isOpen,
    openModal,
  }
}
