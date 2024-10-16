'use server'

import { signIn } from '@/auth'

export const logout = async () => {
	return await signIn()
}
