import { ContentLayout } from '@/components/admin-panel/content-layout'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

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
			Candidate
		</ContentLayout>
	)
}

export default Candidate
