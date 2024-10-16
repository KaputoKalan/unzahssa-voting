'use client'
import { Button } from '@/components/ui/button'
import { useCandidateModal } from '@/hooks/use-candidate-modal'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddCandidateButton = () => {
	const router = useRouter()
	return (
		<Button
			size={'icon'}
			variant={'secondary'}
			onClick={() => router.push('/dashboard/candidates/add')}>
			<PlusCircle />
		</Button>
	)
}

export default AddCandidateButton
