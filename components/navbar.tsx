'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Menu } from 'lucide-react'
import { Card } from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useCurrentRole } from '@/hooks/use-current-role'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut } from '@/auth'
import { useCurrentUser } from '@/hooks/use-current-user'

const Navbar = () => {
	const role = useCurrentRole()
	const user = useCurrentUser()

	console.log(user)

	return (
		<Card className="container bg-card py-3 px-6 border-0 flex items-center mx-auto justify-between gap-6 rounded-2xl mt-5">
			<h1>Logo</h1>

			<ul className="hidden md:flex items-center gap-10 text-card-foreground">
				<li className="text-primary font-medium">
					<Link href="/">Home</Link>
				</li>

				<li>
					<Link href="/vote" className="text-[#1BAB58] font-medium">
						Vote Now
					</Link>
				</li>
				{/* <li>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<span className="cursor-pointer">Pages</span>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="start">
							{landings.map((page) => (
								<DropdownMenuItem key={page.id}>
									<Link href={page.route}>{page.title}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</li> */}
			</ul>

			<div className="flex items-center">
				{role === 'ADMIN' && (
					<Button variant="outline" asChild className="hidden md:block px-2">
						<Link href={'/dashboard'}>Dashboard</Link>
					</Button>
				)}
				{role === 'STUDENT' && (
					<div className="hidden md:block">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage alt={user?.name as string} src={user?.image!} />
									<AvatarFallback className="text-[#1BAB58] font-medium ">
										{user?.username?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => signOut()}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
				{!user && (
					<Button variant="outline" asChild className="hidden md:block px-2">
						<Link href={'/auth/login'}>Login</Link>
					</Button>
				)}

				<div className="flex md:hidden mr-2 items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Menu className="h-5 w-5 rotate-0 scale-100" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Link href="/">Home</Link>
							</DropdownMenuItem>

							<DropdownMenuItem>
								<Link href="/vote" className="text-[#1BAB58]">
									Vote Now!
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								{role === 'ADMIN' && <Link href={'/dashboard'}>Dashboard</Link>}
								{role === 'STUDENT' && (
									<div>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<Avatar>
													<AvatarImage
														alt={user?.name as string}
														src={user?.image!}
													/>
													<AvatarFallback className="text-zicta-blue font-medium">
														{user?.email?.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem onClick={() => signOut()}>
													<LogOut className="mr-2 h-4 w-4" />
													<span>Log out</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								)}
								{!user && <Link href={'/auth/login'}>Login</Link>}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</Card>
	)
}

const landings = [
	{
		id: nanoid(),
		title: 'Landing 01',
		route: '/project-management',
	},
	{
		id: nanoid(),
		title: 'Landing 02',
		route: '/crm-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 03',
		route: '/ai-content-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 04',
		route: '/new-intro-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 05',
		route: '/about-us-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 06',
		route: '/contact-us-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 07',
		route: '/faqs-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 08',
		route: '/pricing-landing',
	},
	{
		id: nanoid(),
		title: 'Landing 09',
		route: '/career-landing',
	},
]

export default Navbar
