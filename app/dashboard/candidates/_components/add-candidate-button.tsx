'use client'
import { Button } from '@/components/ui/button'
import { useCandidateModal } from '@/hooks/use-candidate-modal'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddCandidateButton = () => {
	const router = useRouter()
	return (
		<Button onClick={() => router.push('/dashboard/candidates/add')}>
			Add New Candidate
		</Button>
	)
}

export default AddCandidateButton
