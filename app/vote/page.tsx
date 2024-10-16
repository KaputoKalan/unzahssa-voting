import Navbar from '@/components/navbar'
import Image from 'next/image'
import React from 'react'
import VotingClient from './_components/voting-client'
import { db } from '@/lib/db'

const VotePage = async () => {
	const positons = await db.position.findMany({
		include: {
			Candidate: true,
		},
	})
	return (
		<>
			<Navbar />
			<div className="w-5/6 mx-auto py-10 md:py-20">
				<div className="bg-[#1BAB58] w-full h-[400px] rounded-xl relative flex items-center justify-around">
					<div className="flex-1 ml-10 space-y-4 md:space-y-2">
						<h1 className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl">
							Empower Your Voice: Vote Now!
						</h1>
						<p className="text-white max-w-xl md:max-w-3xl font-medium ">
							You're just one step away from making your voice heard. Review the
							candidates and cast your vote with confidence. Every vote shapes
							the direction of our school — make yours count today.
						</p>
					</div>

					<Image
						src={'/circles.svg'}
						height={0}
						width={0}
						alt="circles"
						className="absolute -right-1  h-[500px] w-[500px] hidden md:block"
					/>
				</div>
				<div className="mt-20">
					<VotingClient positions={positons} />
				</div>
			</div>
		</>
	)
}

export default VotePage
