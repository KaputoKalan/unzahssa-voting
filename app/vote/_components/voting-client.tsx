'use client'

import { useVotingStore } from '@/hooks/use-vote'
import { Candidate, Position } from '@prisma/client'
import Image from 'next/image'

interface VotingClientProps {
	positions: (Position & {
		Candidate: Candidate[]
	})[]
}

const VotingClient = ({ positions }: VotingClientProps) => {
	const { votes, addVote, removeVote } = useVotingStore()

	const handleCandidateClick = (positionId: string, candidateId: string) => {
		const voteIndex = votes.findIndex((vote) => vote.positionId === positionId)

		if (voteIndex !== -1 && votes[voteIndex].candidateId === candidateId) {
			// Deselect if clicked again
			removeVote(positionId)
		} else {
			// Replace or add a new vote
			addVote(positionId, candidateId)
		}
	}

	const isSelected = (positionId: string, candidateId: string) =>
		votes.some(
			(vote) =>
				vote.positionId === positionId && vote.candidateId === candidateId,
		)

	console.log(votes)

	return (
		<div className="flex flex-col items-center w-5/6 mx-auto space-y-40">
			{positions.map((position) => (
				<div className="flex flex-col items-center" key={position.id}>
					<div>
						<h2 className="text-2xl md:text-3xl text-center capitalize font-bold">
							{position.value.toLowerCase()}
						</h2>
						<p className="text-muted-foreground text-center">
							Select a candidate for the position of{' '}
							{position.value.toLowerCase()}
						</p>
					</div>
					<div className="mt-10 space-y-4 w-full md:w-[500px] max-w-2xl">
						{position.Candidate.map((candidate) => (
							<div
								key={candidate.id}
								className="md:h-[80px] h-[50px] w-full flex items-center gap-2 cursor-pointer"
								onClick={() => handleCandidateClick(position.id, candidate.id)}>
								<Image
									src={candidate.imageUrl || '/placeholder.png'}
									alt="Candidate Image"
									width={600}
									height={600}
									className="md:h-[80px] object-fill md:w-[80px] w-[50px] h-[50px]"
								/>
								<div
									className={`flex-1 flex p-4 items-center h-full transition-colors gap-2 ${
										isSelected(position.id, candidate.id)
											? 'bg-[#1BAB58] text-white'
											: 'bg-gray-100 hover:bg-[#1BAB58] hover:text-white'
									}`}>
									<p className="font-bold capitalize text-xs md:text-base">
										{candidate.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default VotingClient
