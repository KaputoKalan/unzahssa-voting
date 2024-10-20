'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

interface ChartContainerProps {
	data: { name: string; votes: number }[]
}

const CandidateChart: React.FC<ChartContainerProps> = ({ data }) => {
	const getColor = (index: number) => `hsl(${(index * 137.5) % 360}, 70%, 50%)`

	const chartDataWithColors = data.map((data, index) => ({
		...data,
		fill: getColor(index), // Assign color to each data point
	}))

	return (
		<ChartContainer
			config={chartDataWithColors.reduce((acc, data, index) => {
				acc[data.name] = {
					label: data.name,
					color: getColor(index),
				}
				return acc
			}, {} as Record<string, { label: string; color: string }>)}
			className="h-[300px]">
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis allowDecimals={false} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="votes" fill={'#1BAB58'} />
			</BarChart>
		</ChartContainer>
	)
}

export default CandidateChart
