'use server'
import { signIn } from '@/auth'
import { getUserByComputerNumber } from '@/data/user'

import { db } from '@/lib/db'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'

import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields' }
	}

	const { computerNumber, password } = validatedFields.data

	const existingUser = await getUserByComputerNumber(computerNumber)

	if (!existingUser || !existingUser.computerNumber || !existingUser.password) {
		return { error: 'Computer Number does not exist' }
	}

	try {
		await signIn('credentials', {
			computerNumber,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid Credentials' }

				default:
					return { error: 'Oops.. Something went wrong' }
			}
		}
		throw error
	}
}
