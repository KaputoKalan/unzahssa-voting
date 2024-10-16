'use server'

import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { computerNumber, password, username } = validatedFields.data

	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await db.user.findUnique({
		where: {
			computerNumber,
		},
	})

	if (existingUser) {
		return { error: 'Computer Number already in use' }
	}

	await db.user.create({
		data: {
			username,
			computerNumber,
			password: hashedPassword,
		},
	})

	return { success: 'Student Created Successfully' }
}
