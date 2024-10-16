import { create } from 'zustand'

interface VotingState {
	selectedCandidates: { [positionId: string]: string | null } // Stores candidate IDs by position ID
	selectCandidate: (positionId: string, candidateId: string) => void
	deselectCandidate: (positionId: string) => void
}

export const useVotingStore = create<VotingState>((set) => ({
	selectedCandidates: {},
	selectCandidate: (positionId, candidateId) =>
		set((state) => ({
			selectedCandidates: {
				...state.selectedCandidates,
				[positionId]: candidateId,
			},
		})),
	deselectCandidate: (positionId) =>
		set((state) => ({
			selectedCandidates: { ...state.selectedCandidates, [positionId]: null },
		})),
}))
