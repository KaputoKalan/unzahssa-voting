import { create } from 'zustand'

interface CandidateModalInterface {
	isOpen: boolean
	open: () => void
	close: () => void
}

export const useCandidateModal = create<CandidateModalInterface>((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}))
