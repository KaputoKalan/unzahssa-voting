'use client'

import * as z from 'zod'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/actions/login'

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition()
	const searchParams = useSearchParams()

	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with a different provider'
			: ''
	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			computerNumber: '',
			password: '',
		},
	})

	const { isValid } = form.formState

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset()
						setError(data?.error)
					}

					form.reset()
					setSuccess('Login successful')
				})
				.catch(() => setError('Oops.. Something went wrong.'))
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonHref=""
			backButtonLabel="">
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="computerNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Computer Number</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="2017001903"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder="********"
											type="password"
										/>
									</FormControl>
									<Button
										size="sm"
										variant={'link'}
										asChild
										className="px-0 font-normal">
										<Link href="/auth/reset">Forgot Password?</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending || !isValid}
						type="submit"
						className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
