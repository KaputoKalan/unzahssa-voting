import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import bcrypt from 'bcryptjs'
import { getUserByComputerNumber } from './data/user'
import { LoginSchema } from './schemas'

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials)
				if (validatedFields.success) {
					const { computerNumber, password } = validatedFields.data

					const user = await getUserByComputerNumber(computerNumber)

					if (!user || !user.password) return null

					const passwordsMatch = await bcrypt.compare(password, user.password)

					if (passwordsMatch) return user
				}

				return null
			},
		}),
	],
} satisfies NextAuthConfig
