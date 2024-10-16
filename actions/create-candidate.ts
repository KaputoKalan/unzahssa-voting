'use server'
import { NewCandidateSchema } from '@/schemas'
import * as z from 'zod'
import { db } from '@/lib/db'

export const createCandidate = async (
	values: z.infer<typeof NewCandidateSchema>,
) => {
	const validatedFields = NewCandidateSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { description, name, position, program, yearOfStudy, imageUrl } =
		validatedFields.data

	const candidate = await db.candidate.create({
		data: {
			description,
			name,
			positionId: position,
			program,
			yearOfStudy,
			imageUrl,
		},

		select: {
			id: true,
			name: true,
		},
	})

	return { success: 'Successfully created candidate', data: candidate }
}
