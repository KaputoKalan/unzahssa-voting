import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { type ChartConfig } from '@/components/ui/chart'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { currentRole } from '@/lib/auth'
import { db } from '@/lib/db'
import { Candidate, Position, Vote } from '@prisma/client'
import { Group, Ticket, Users } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import CandidateChart from './_component/candidate-chart'

interface PreparedDataProps {
	position: Position & {
		Vote: (Vote & {
			candidate: Candidate
		})[]
	}
}

export const revalidate = 0

const DashboardPage = async () => {
	const role = await currentRole()

	// Fetch candidates, positions, and computerNumbers
	const candidates = await db.candidate.findMany({
		include: {
			position: true,
			votes: true,
		},
	})

	const positions = await db.position.findMany({
		include: {
			Vote: {
				include: {
					candidate: true,
				},
			},
		},
	})

	const computerNumbers = await db.computerNumbers.findMany()

	// Prepare chart data for each position
	const prepareChartData = (position: PreparedDataProps['position']) => {
		const candidateVotes = position.Vote.reduce((acc, vote) => {
			acc[vote.candidate.name] = (acc[vote.candidate.name] || 0) + 1
			return acc
		}, {} as Record<string, number>)

		return Object.entries(candidateVotes).map(([name, votes]) => ({
			name,
			votes,
		}))
	}

	// Function to generate a unique color for each bar in the chart
	const getColor = (index: number) => `hsl(${(index * 137.5) % 360}, 70%, 50%)`

	if (role !== 'ADMIN') {
		redirect('/')
	}

	return (
		<ContentLayout title="Dashboard">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				</div>
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="candidates">Candidates</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Votes
									</CardTitle>
									<Ticket className="text-muted-foreground h-5 w-5" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{positions[0]?.Vote.length || 0}
									</div>
									<p className="text-xs text-muted-foreground">
										Total votes casted in the election.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Positions
									</CardTitle>
									<Ticket className="text-muted-foreground h-5 w-5" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{positions.length}</div>
									<p className="text-xs text-muted-foreground">
										Total positions in the election.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Candidates
									</CardTitle>
									<Users className="text-muted-foreground h-5 w-5" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{candidates.length}</div>
									<p className="text-xs text-muted-foreground">
										Total candidates in the election.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Computer Numbers
									</CardTitle>
									<Users className="text-muted-foreground h-5 w-5" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{computerNumbers.length}
									</div>
									<p className="text-xs text-muted-foreground">
										Total computer numbers that can participate in the election.
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Charts for each position */}
						<div className=" grid grid-cols-2 gap-10 mt-10">
							{positions.map((position) => {
								const chartData = prepareChartData(position)

								return (
									<Card key={position.id} className="w-full">
										<CardHeader>
											<CardTitle>{position.label}</CardTitle>
											<CardDescription>
												Vote distribution for candidates
											</CardDescription>
										</CardHeader>
										<CardContent>
											<CandidateChart data={chartData} />
										</CardContent>
									</Card>
								)
							})}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</ContentLayout>
	)
}

export default DashboardPage
