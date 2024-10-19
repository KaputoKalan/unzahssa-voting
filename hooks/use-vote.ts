import { create } from 'zustand'

interface VoteState {
	votes: { positionId: string; candidateId: string }[]
	addVote: (positionId: string, candidateId: string) => void
	removeVote: (positionId: string) => void
	resetVotes: () => void
}

export const useVotingStore = create<VoteState>((set) => ({
	votes: [],
	addVote: (positionId, candidateId) =>
		set((state) => ({
			votes: state.votes
				.filter((vote) => vote.positionId !== positionId) // Remove existing vote for the position
				.concat({ positionId, candidateId }), // Add new vote
		})),
	removeVote: (positionId) =>
		set((state) => ({
			votes: state.votes.filter((vote) => vote.positionId !== positionId),
		})),
	resetVotes: () =>
		set(() => ({
			votes: [], // Clear all votes
		})),
}))
