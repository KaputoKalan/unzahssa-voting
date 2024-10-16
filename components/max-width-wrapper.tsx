import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) => {
	return (
		<div className={cn('mx-auto w-5/6 lg:w-4/6', className)}>{children}</div>
	)
}

export default MaxWidthWrapper
