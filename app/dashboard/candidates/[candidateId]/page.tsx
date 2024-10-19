import { ContentLayout } from '@/components/admin-panel/content-layout'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, GraduationCap, User } from 'lucide-react'
import Link from 'next/link'

interface CandidateProps {
	params: { candidateId: string }
}
const Candidate = async ({ params }: CandidateProps) => {
	const candidate = await db.candidate.findUnique({
		where: {
			id: params.candidateId,
		},
	})

	if (!candidate) {
		return redirect('/dashboard/candidates')
	}
	return (
		<ContentLayout title={`Candidate: ${candidate.name}`}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard/candidates">Candidates</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>{candidate.name}</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="container mx-auto px-4 py-8">
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
						</div>
					</CardHeader>
					<CardContent className="prose prose-sm sm:prose-base max-w-none">
						<h3 className="font-semibold text-lg mb-2">About the Candidate</h3>
						<p>{candidate.description}</p>
					</CardContent>
				</Card>
			</div>
		</ContentLayout>
	)
}

export default Candidate
