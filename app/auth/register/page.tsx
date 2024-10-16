import Image from 'next/image'
import { RegisterForm } from '@/components/auth/register-form'

const SignUp = () => {
	return (
		<>
			<div className="container relative h-screen flex-col items-center px-5 justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
				</div>
				<div className="lg:p-8 ">
					<div className="mx-auto p-4 flex  flex-col justify-center space-y-6 sm:w-[350px]">
						<RegisterForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
