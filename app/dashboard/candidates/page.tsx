import { ContentLayout } from '@/components/admin-panel/content-layout'
import React from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import AddCandidateButton from './_components/add-candidate-button'
import NewCandidateModal from '@/components/modals/new-candidate-modal'
import { db } from '@/lib/db'
import { Separator } from '@/components/ui/separator'
import CandidateCard from './_components/candidate-card'

export const revalidate = 0
const CandidatesPage = async () => {
	const positions = await db.position.findMany({
		include: {
			Candidate: true,
		},
	})
	return (
		<ContentLayout title="Candidates">
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
				</BreadcrumbList>
			</Breadcrumb>
			<div className="min-h-[80vh] h-full p-10 space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">Candidates</h1>
					<AddCandidateButton />
				</div>

				<div className="space-y-12">
					{positions.map((position) => (
						<div key={position.id} className="space-y-4">
							<h2 className="text-xl capitalize font-bold italic">
								{position.value.toLowerCase()}
							</h2>
							<Separator />
							<div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
								{position.Candidate.map((candidate) => (
									<CandidateCard
										description={candidate.description!}
										id={candidate.id}
										name={candidate.name}
										program={candidate.program!}
										yearOfStudy={candidate.yearOfStudy!}
										imageUrl={candidate.imageUrl!}
										key={candidate.id}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</ContentLayout>
	)
}

export default CandidatesPage
