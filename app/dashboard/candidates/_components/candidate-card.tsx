import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface CandidateCardProps {
	id: string
	name: string
	program: string
	yearOfStudy: string
	description: string
	imageUrl?: string
}
const CandidateCard = ({
	name,
	program,
	yearOfStudy,
	description,
	imageUrl,
	id,
}: CandidateCardProps) => {
	return (
		<Card>
			<Link href={`/dashboard/candidates/${id}`}>
				<Image
					src={imageUrl ? imageUrl : '/placeholder.png'}
					alt="Image"
					width={600}
					height={600}
					className="rounded-t-lg h-[200px] object-fill w-full"
				/>
			</Link>
			<CardContent className="py-2">
				<h3 className="text-lg font-bold line-clamp-2">{name}</h3>
				<div className="flex items-center justify-between w-full">
					<p className="text-sm font-medium capitalize">
						{program.toLowerCase()}
					</p>
					<p className="text-sm font-medium capitalize ">
						{yearOfStudy.toLowerCase()} year
					</p>
					<p></p>
				</div>
				<p className="text-sm line-clamp-3 text-muted-foreground mt-2 ">
					{description}
				</p>
			</CardContent>
		</Card>
	)
}

export default CandidateCard
