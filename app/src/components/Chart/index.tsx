import { PieChart, Pie, Cell } from "recharts"
import styled from "@emotion/styled"

type Props = {
  results: Array<{ id: number; votes: number }>
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="20px" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}`}
    </text>
  )
}

export default function Chart(props: Props) {
  const totalVotes = props.results.reduce((acc, answer) => acc + answer.votes, 0)
  const fixedResults = props.results.map((result) => {
    return {
      ...result,
      value: Math.floor((result.votes / totalVotes) * 100),
    }
  })
  console.log(fixedResults)
  // draw circle chart
  return (
    <ChartContainer>
      <PieChart width={180} height={180}>
        <Pie data={fixedResults} dataKey="value" labelLine={false} label={renderCustomizedLabel}>
          {fixedResults.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.id % 2 ? "#E47434" : "#133B6B"} strokeWidth={0} />
          ))}
        </Pie>
      </PieChart>
      <PercentSymbol>%</PercentSymbol>
    </ChartContainer>
  )
}

const ChartContainer = styled.div({
  position: "relative",
})

const PercentSymbol = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "#DBDBDB",
  color: "#FFFFFF",
  fontSize: 24,
  fontWeight: "700",
})
