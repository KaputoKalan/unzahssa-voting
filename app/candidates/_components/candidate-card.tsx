import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, GraduationCap } from 'lucide-react'
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
		<Card className="">
			<Link href={`/candidates/${id}`}>
				<Image
					src={imageUrl ? imageUrl : '/placeholder.png'}
					alt="Image"
					width={600}
					height={600}
					className="rounded-t-lg h-[200px] object-fill w-full"
				/>
			</Link>
			<CardContent className="py-2 space-y-2">
				<h3 className="text-lg font-bold line-clamp-2">{name}</h3>

				<p className="text-sm line-clamp-3 text-muted-foreground mt-2 ">
					{description}
				</p>
				<div className="flex flex-col space-y-2 pb-4">
					<div className="text-xs capitalize flex font-semibold">
						<GraduationCap className="w-4 h-4 mr-1 " />
						{program?.toLowerCase()}
					</div>
					<div className="text-xs flex font-semibold">
						<CalendarDays className="w-4 h-4 mr-1" />
						{yearOfStudy?.toLowerCase()} Year
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default CandidateCard
