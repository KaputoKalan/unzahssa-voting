'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/auth/header'

import { BackButton } from './back-button'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
}

export const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
}: CardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>

			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}
