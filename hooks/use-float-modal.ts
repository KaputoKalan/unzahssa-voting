import { create } from 'zustand'

interface FloatModalStore {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

const useFloatModal = create<FloatModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}))

export default useFloatModal
