import * as z from 'zod'

export const LoginSchema = z.object({
	computerNumber: z.string({
		message: 'Computer Number is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
})

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Minimum of 6 characters required',
	}),
})

export const RegisterSchema = z.object({
	computerNumber: z.string({
		message: 'Computer Number is required',
	}),
	password: z.string().min(6, {
		message: 'Minimum of 6 characters required',
	}),
	username: z.string().min(1, {
		message: 'Name is required',
	}),
})

export const NewCandidateSchema = z.object({
	name: z.string().min(2, {
		message: 'Minimum of 2 characters required',
	}),
	description: z
		.string()
		.min(3, { message: 'Minimum of 3 characters required' }),
	position: z.string().min(3, { message: 'Minimum of 3 characters required' }),
	imageUrl: z.string().optional(),
})
