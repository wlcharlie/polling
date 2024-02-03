import styled from "@emotion/styled"
import { Cell, Pie, PieChart } from "recharts"

export default function ChartSymbol() {
  const fakeData = [
    { name: "A", value: 50 },
    { name: "B", value: 50 },
  ]

  return (
    <div style={{ position: "relative" }}>
      <PieChart width={80} height={80} style={{ transform: "rotate(50deg)" }}>
        <Pie data={fakeData} dataKey="value">
          <Cell fill="#D55A1E" />
          <Cell fill="#78AAC5" />
        </Pie>
      </PieChart>
      <PercentSymbol>%</PercentSymbol>
    </div>
  )
}

const PercentSymbol = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "#FFFFFF",
  color: "gray",
  fontSize: 16,
  fontWeight: "bold",
})
