'use client'

import { vote } from '@/actions/vote'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useVotingStore } from '@/hooks/use-vote'
import { Candidate, Position } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface VotingClientProps {
	positions: (Position & {
		Candidate: Candidate[]
	})[]
}

const VotingClient = ({ positions }: VotingClientProps) => {
	const { votes, addVote, removeVote, resetVotes } = useVotingStore()
	const [computerNumber, setComputerNumber] = useState<string>('')
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

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

	const handleSubmit = () => {
		if (computerNumber.length < 10) {
			toast.error('Computer number must be at least 10 digits long.')
			return
		}

		const payload = {
			computerNumber,
			votes,
		}

		startTransition(() => {
			console.log(payload)
			vote(payload.votes, payload.computerNumber).then((data) => {
				if (data.success) {
					setComputerNumber('')
					toast.success(data.success)
					resetVotes()
					router.refresh()
				}
				if (data.error) {
					toast.error(data.error)
				}
			})
		})
	}

	return (
		<div className="flex flex-col items-start w-full mx-auto space-y-10">
			{positions.map((position) => (
				<div
					className="flex flex-col items-start w-full mt-20"
					key={position.id}>
					<h2 className="text-2xl md:text-5xl text-center mb-2 capitalize font-bold">
						{position.value.toLowerCase()}
					</h2>
					<p className="text-muted-foreground text-2xl text-center mb-12">
						Select a candidate for the position of{' '}
						{position.value.toLowerCase()}
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
						{position.Candidate.map((candidate) => (
							<div
								key={candidate.id}
								className={`border p-4 rounded-lg cursor-pointer transition-all ${
									isSelected(position.id, candidate.id)
										? 'bg-[#1BAB58] text-white'
										: 'bg-gray-100 hover:bg-[#1BAB58] hover:text-white'
								}`}
								onClick={() => handleCandidateClick(position.id, candidate.id)}>
								{/* Candidate Image */}
								<div className="w-full aspect-square max-h-[400px] relative overflow-hidden rounded-t-lg mb-5">
									<Image
										src={candidate.imageUrl || '/placeholder.png'}
										alt={`${candidate.name} Image`}
										layout="fill"
										objectFit="cover"
										objectPosition="top"
										className="rounded-lg"
									/>
								</div>

								{/* Candidate Info */}
								<h3 className="text-xl font-bold capitalize">
									{candidate.name}
								</h3>
								<p className="text-xl font-medium italic mt-2">
									{candidate.description || 'No description available.'}
								</p>
							</div>
						))}
					</div>
					<Separator className="my-20" />
				</div>
			))}

			{/* Phone Number Input */}
			<div className="w-1/3 mt-10">
				<Label className="text-xl font-bold mb-5" htmlFor="computer-number">
					Computer Number:
				</Label>
				<Input
					id="computer-number"
					type="number"
					className="w-full p-3 border rounded-lg h-12"
					placeholder="Computer Number"
					value={computerNumber}
					onChange={(e) => setComputerNumber(e.target.value)}
					minLength={10}
				/>

				{/* Submit Button */}
				<Button
					disabled={isPending}
					onClick={handleSubmit}
					size={'lg'}
					className="mt-6 bg-[#1BAB58] text-white px-6 py-2 w-full font-bold text-lg rounded-lg">
					{isPending ? 'Voting...' : 'Submit'}
				</Button>
			</div>
		</div>
	)
}

export default VotingClient
