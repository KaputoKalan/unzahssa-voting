'use client'
import * as z from 'zod'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import React, { useTransition } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCandidateSchema } from '@/schemas'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useCandidateModal } from '@/hooks/use-candidate-modal'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { programOfStudy, yearOfStudy } from '@/constants'
import { createCandidate } from '@/actions/create-candidate'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/cloud-upload'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Loader2 } from 'lucide-react'
import { ContentLayout } from '@/components/admin-panel/content-layout'

interface PositionsProps {
	id: string
	label: string
	value: string
}

const NewCandidateModal = () => {
	const { data: positions, isLoading } = useSWR<PositionsProps[]>(
		'/api/position',
		fetcher,
	)

	const form = useForm<z.infer<typeof NewCandidateSchema>>({
		resolver: zodResolver(NewCandidateSchema),
	})
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	if (isLoading) {
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<Loader2 className="h-6 w-6 animate-spin" />
			</div>
		)
	}

	const onSubmit = async (values: z.infer<typeof NewCandidateSchema>) => {
		startTransition(() => {
			createCandidate({ ...values }).then((res) => {
				if (res.success) {
					form.reset()
					toast.success(res?.success)

					router.push(`/dashboard/candidates/${res.data.id}`)
				}
			})
		})
	}

	const { isSubmitting, isValid } = form.formState
	return (
		<ContentLayout title="Add New Candidate">
			<div className=" w-full md:w-5/6 mx-auto relative flex flex-col items-center space-y-6 min-h-screen">
				<h1 className="text-2xl font-semibold capitalize">
					Add a new Candidate
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 bg-white p-5 rounded-lg shadow-sm w-5/6 md:w-4/6 mx-auto">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Name <span className="text-red-500  ml-1">*</span>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											{...field}
											placeholder="Name of the candidate"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Description <span className="text-red-500 ml-1">*</span>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											{...field}
											placeholder="Campaign Slogan / Name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="position"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Position <span className="text-red-500 ml-1">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="">
												<SelectValue placeholder="Position" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{positions?.map((pos, index) => (
												<SelectItem key={index} value={pos?.id}>
													{pos?.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="imageUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Banner Image</FormLabel>
									<FormControl>
										<ImageUpload
											value={field.value ? [field.value] : []}
											onChange={(url) => field.onChange(url)}
											onRemove={() => field.onChange('')}
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										16:9 aspect ratio recommended
									</FormDescription>
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isPending}>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</ContentLayout>
	)
}

export default NewCandidateModal

// import React from 'react'

// const page = () => {
//   return (
//     <div className="p-10 w-full md:w-5/6 mx-auto relative flex flex-col items-center justify-center space-y-6">
//     <h1 className="text-2xl font-semibold capitalize">
//         Add a new car listing
//     </h1>page</div>
//   )
// }

// export default page
