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
	const { selectedCandidates, selectCandidate, deselectCandidate } =
		useVotingStore()

	const handleCandidateClick = (positionId: string, candidateId: string) => {
		if (selectedCandidates[positionId] === candidateId) {
			deselectCandidate(positionId) // Deselect if clicked again
		} else {
			selectCandidate(positionId, candidateId) // Select the new candidate
		}
	}

	console.log(selectedCandidates)

	return (
		<div className="flex flex-col items-center w-5/6 mx-auto space-y-40">
			{positions.map((position) => (
				<div className="flex flex-col items-center " key={position.id}>
					<div>
						<h2 className="text-2xl md:text-3xl text-center capitalize font-bold">
							{position.value.toLowerCase()}
						</h2>
						<p className="text-muted-foreground text-center ">
							Select a candidate for the position of{' '}
							{position.value.toLowerCase()}
						</p>
					</div>
					<div className="mt-10 space-y-4 w-full md:w-[500px] max-w-2xl">
						{position.Candidate.map((item) => (
							<div
								key={item.id}
								className={`md:h-[80px] h-[50px] w-full flex items-center gap-2 `}
								onClick={() => handleCandidateClick(position.id, item.id)}>
								<Image
									src={item.imageUrl ? item.imageUrl : '/placeholder.png'}
									alt="Image"
									width={600}
									height={600}
									className="md:h-[80px] object-fill md:w-[80px] w-[50px] h-[50px] col-span-2"
								/>
								<div
									className={`flex-1 flex p-4 items-center cursor-pointer h-full hover:bg-[#1BAB58] transition gap-2 ${
										selectedCandidates[position.id] === item.id
											? 'bg-[#1BAB58] text-white'
											: 'bg-gray-100'
									}`}>
									<p className="font-bold capitalize text-xs md:text-base">
										{item.name}
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
