import styled from "@emotion/styled"
import { format } from "date-fns"
import ChartSymbol from "../ChartSymbol"

type Props = {
  title: string
  time: number
  onClick: () => void
}

export default function PollItem(props: Props) {
  return (
    <ItemContainer onClick={props.onClick}>
      <ItemInnerContainer>
        <ItemSection style={{ flex: 1 }}>
          <ChartSymbol />
        </ItemSection>
        <ItemSection style={{ flex: 3.5 }}>
          <div className="item_section_time">{format(new Date(props.time * 1000), "dd MMM yyyy")}</div>
          <div className="item_section_title">{props.title}</div>
        </ItemSection>
      </ItemInnerContainer>
    </ItemContainer>
  )
}

const ItemContainer = styled.div({
  display: "flex",
  height: "100px",
  cursor: "pointer",
})

const ItemInnerContainer = styled.div({
  display: "flex",
  padding: "8px",
})

const ItemSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,

  "& .item_section_time": {
    fontSize: 12,
    fontWeight: "700",
    color: "#26658E",
  },
  "& .item_section_title": {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 1.25,
  },
})
