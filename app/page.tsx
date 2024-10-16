import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
	const user = await currentUser()

	console.log(user)
	return (
		<>
			<Navbar />
			<div className="flex flex-col min-h-[100dvh]">
				<main className="flex-1">
					<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 ">
						<div className="container px-4 md:px-6 mx-auto">
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
										UNZA School of Humanities{' '}
										<span className="text-[#1BAB58]">Elections.</span>
									</h1>
									<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
										Cast your vote and shape the future of the School of
										Humanities. Secure, easy, and accessible — make your voice
										heard and participate in the decisions that matter most to
										you.
									</p>
								</div>
								<div className="space-x-4">
									<Button className="bg-[#1BAB58]" asChild>
										<Link href={'/vote'}>Vote Now</Link>
									</Button>
									<Button variant="outline" asChild>
										<Link href={'/candidates'}>Candidates</Link>
									</Button>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	)
}
