import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from './data/user'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
	interface Session {
		user: {
			role: UserRole
			changedPassword: boolean
			username: string
		} & DefaultSession['user']
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (token.changedPassword && session.user) {
				session.user.changedPassword = token.changedPassword as boolean
			}

			if (token.username && session.user) {
				session.user.username = token.username as string
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token
			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.role = existingUser.role
			token.changedPassword = existingUser.changedPassword as boolean
			token.username = existingUser.username as string

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
