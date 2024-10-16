import React from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, GraduationCap, User } from 'lucide-react'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import Navbar from '@/components/navbar'

interface CandidateProps {
	params: { candidateId: string }
}

const CandidatePage = async ({ params }: CandidateProps) => {
	const candidate = await db.candidate.findUnique({
		where: {
			id: params.candidateId,
		},
	})

	if (!candidate) {
		return redirect('/candidates')
	}

	return (
		<>
			<Navbar />
			<div className="container mx-auto px-4 py-20">
				<Card className="max-w-3xl mx-auto">
					<CardHeader className="flex flex-col sm:flex-row items-center gap-4">
						<Avatar className="w-24 h-24 sm:w-32 sm:h-32">
							<AvatarImage
								src={
									candidate.imageUrl ? candidate.imageUrl : '/placeholder.png'
								}
								alt={candidate.name}
							/>
							<AvatarFallback>Image</AvatarFallback>
						</Avatar>
						<div className="text-center sm:text-left">
							<CardTitle className="text-2xl sm:text-3xl font-bold">
								{candidate.name}
							</CardTitle>
							<div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
								<Badge variant="secondary" className="text-sm capitalize">
									<GraduationCap className="w-4 h-4 mr-1 " />
									{candidate.program?.toLowerCase()}
								</Badge>
								<Badge variant="secondary" className="text-sm">
									<CalendarDays className="w-4 h-4 mr-1" />
									{candidate.yearOfStudy?.toLowerCase()} Year
								</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent className="prose prose-sm sm:prose-base max-w-none">
						<h3 className="font-semibold text-lg mb-2">About the Candidate</h3>
						<p>{candidate.description}</p>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default CandidatePage
