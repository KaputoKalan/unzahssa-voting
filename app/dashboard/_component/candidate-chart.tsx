'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface ChartContainerProps {
	data: { name: string; votes: number }[]
	config: Record<string, { label: string; color: string }>
}

const CandidateChart: React.FC<ChartContainerProps> = ({ data, config }) => {
	const getColor = (index: number) => `hsl(${(index * 137.5) % 360}, 70%, 50%)`
	return (
		<div className="h-[300px]">
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis allowDecimals={false} />
				<ChartTooltip content={<ChartTooltipContent />} />
				{data.map((entry, index) => (
					<Bar key={entry.name} dataKey="votes" fill={getColor(index)} />
				))}
			</BarChart>
		</div>
	)
}

export default CandidateChart
