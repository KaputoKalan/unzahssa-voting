'use client'

import { signOut } from '@/auth'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
	children: React.ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		signOut()
	}

	return (
		<span className="cursor-pointer" onClick={onClick}>
			{children}
		</span>
	)
}

export default LogoutButton
