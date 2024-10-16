import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import React from 'react'
import CandidateCard from './_components/candidate-card'
import Navbar from '@/components/navbar'

const CandidatesPage = async () => {
	const positions = await db.position.findMany({
		include: {
			Candidate: true,
		},
	})
	return (
		<>
			<Navbar />
			<div className="min-h-[80vh] w-5/6 mx-auto h-full p-10 space-y-6  md:py-20">
				<div className="flex items-center justify-between mb-20">
					<div>
						<h1 className="text-2xl md:text-4xl font-bold">Candidates</h1>
						<p className="text-muted-foreground max-w-2xl">
							List of candidate for this year's UNZAHSSA elections
						</p>
					</div>
				</div>
				<div className="space-y-40">
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
		</>
	)
}

export default CandidatesPage
