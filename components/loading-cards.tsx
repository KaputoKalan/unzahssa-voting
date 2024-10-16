import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingCards = () => {
	return (
		<MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<div key={index} className="flex flex-col space-y-3">
					<Skeleton className="h-[100px] md:h-[150px] w-full rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
					</div>
				</div>
			))}
		</MaxWidthWrapper>
	)
}

export default LoadingCards
