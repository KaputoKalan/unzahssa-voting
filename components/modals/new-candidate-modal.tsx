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
import { Modal } from './modal'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCandidateSchema } from '@/schemas'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useCandidateModal } from '@/hooks/use-candidate-modal'
import { ImageUpload } from '../cloud-upload'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { positions, programOfStudy, yearOfStudy } from '@/constants'
import { createCandidate } from '@/actions/create-candidate'

const NewCandidateModal = () => {
	const candidateModal = useCandidateModal()

	const form = useForm<z.infer<typeof NewCandidateSchema>>({
		resolver: zodResolver(NewCandidateSchema),
	})
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof NewCandidateSchema>) => {
		startTransition(() => {
			createCandidate({ ...values }).then((res) => {
				if (res.success) {
					form.reset()
					toast.success(res?.success)

					router.push(`/dashboard/candidate/${res.data.id}`)
				}
			})
		})
	}

	const { isSubmitting, isValid } = form.formState
	return (
		<Modal
			title="Create new candidate"
			description="Fill in the form below to create a new candidate"
			isOpen={candidateModal.isOpen}
			onClose={candidateModal.close}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
									<Textarea
										disabled={isSubmitting}
										{...field}
										placeholder="Description of the candidate"
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
										{positions.map((pos, index) => (
											<SelectItem key={index} value={pos?.value!}>
												{pos?.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-5">
						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Program <span className="text-red-500 ml-1">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="">
												<SelectValue placeholder="Select the program of study" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{programOfStudy.map((prog, index) => (
												<SelectItem key={index} value={prog?.value!}>
													{prog?.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="yearOfStudy"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Year <span className="text-red-500 ml-1">*</span>
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="">
												<SelectValue placeholder="Select the year of study" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{yearOfStudy.map((year, index) => (
												<SelectItem key={index} value={year?.value!}>
													{year?.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>

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
								<FormDescription>16:9 aspect ratio recommended</FormDescription>
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isPending}>
						Submit
					</Button>
				</form>
			</Form>
		</Modal>
	)
}

export default NewCandidateModal
