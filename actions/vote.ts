'use server'

import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function vote(
	votes: { positionId: string; candidateId: string }[],
	computerNumber: string,
) {
	try {
		const user = await currentUser()

		if (!user) {
			return { error: 'User not aunticated' }
		}

		const alreadyVoted = await db.votedComputerNumbers.findUnique({
			where: { computerNumber: BigInt(computerNumber) },
		})

		if (alreadyVoted) {
			return { error: 'Computer Number already voted' }
		}

		const computerNumberExists = await db.computerNumbers.findUnique({
			where: { computerNumber: BigInt(computerNumber) },
		})

		if (!computerNumberExists) {
			return { error: 'Computer Number not registered to vote' }
		}

		const votePromises = votes.map((vote) =>
			db.vote.create({
				data: {
					userId: user.id!,
					candidateId: vote.candidateId,
					positionId: vote.positionId,
				},
			}),
		)

		await Promise.all(votePromises)

		await db.votedComputerNumbers.create({
			data: {
				computerNumber: BigInt(computerNumber),
				votedAt: new Date(),
			},
		})

		return { success: 'Vote has been successfully added!' }
	} catch (error: any) {
		console.log(error, 'vote error')
		return { error: error.message }
	}
}
