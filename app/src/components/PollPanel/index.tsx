import styled from "@emotion/styled"
import { format } from "date-fns"
import Chart from "../Chart"

type Props = {
  showToday?: boolean
  title: string
  time: number
  options: Array<{ id: number; label: string }>
  answers: Array<{ id: number; votes: number }>
  onOptionClick: (OptionId: number) => void
}

export default function PollPanel(props: Props) {
  const totalVotes = props.answers.reduce((acc, answer) => acc + answer.votes, 0)

  return (
    <>
      {props.showToday ? null : (
        <Header>
          <h1 style={{ fontSize: "24px", lineHeight: 1.25 }}>{props.title}</h1>
          <Divider />
          <div style={{ color: "grey", fontSize: "13px", textAlign: "right" }}>
            PUBLISHED: {format(new Date(props.time * 1000), "iiii, dd MMM, yyyy, HH:mm a")}
          </div>
        </Header>
      )}
      <PanelContainer
        style={{
          background: props.showToday ? "#DBDBDB" : "#B2CFE4",
        }}
      >
        {props.showToday && <div className="panel_today_title"> Today's Poll</div>}
        <PanelLayout>
          <PanelSection style={{ flex: "4", padding: "8px 16px" }}>
            {props.showToday ? (
              <PanelTitle>
                {props.title}
                <span className="panel_title_time">{format(new Date(props.time * 1000), "dd MMM yyyy")}</span>
              </PanelTitle>
            ) : null}
            {props.showToday ? null : <PanelTitleMobile>{props.title}</PanelTitleMobile>}
            <PanelSection style={{ margin: "4px 8px 0" }}>
              {props.options.map((option) => (
                <PanelButton
                  key={option.id}
                  style={{ background: option.id % 2 ? "#E47434" : "#133B6B" }}
                  onClick={() => props.onOptionClick(option.id)}
                >
                  {option.label}
                </PanelButton>
              ))}
            </PanelSection>
          </PanelSection>
          <PanelSection style={{ flex: "1.4" }}>
            <Chart results={props.answers} />
          </PanelSection>
        </PanelLayout>
        <div className="panel_vote_result">Total numbers of votes recorded: {totalVotes}</div>
        <Divider />
      </PanelContainer>
    </>
  )
}

const Header = styled.div({
  marginBottom: 8,
  "@media (max-width: 600px)": {
    display: "none",
  },
})

const PanelContainer = styled.div({
  width: "min(100vw,100%)",
  height: "fit-content",
  backgroundColor: "#DBDBDB",
  borderRadius: 1,
  padding: "8px 0",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& .panel_today_title": {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "700",
    color: "#26658E",
    padding: "12px 12px 0px",
  },
  "& .panel_vote_result": {
    alignSelf: "flex-start",
    fontSize: 13,
    padding: "12px 12px 0px",
    "@media (max-width: 600px)": {
      alignSelf: "center",
    },
  },
})

const PanelLayout = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
  },
})

const PanelSection = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 4,
})

const PanelTitle = styled.div({
  fontSize: 17,
  fontWeight: "500",
  lineHeight: 1.25,
  "& .panel_title_time": {
    fontSize: 12,
    fontWeight: "700",
    color: "#26658E",
    paddingLeft: 8,
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
})

const PanelTitleMobile = styled.div({
  fontSize: 17,
  fontWeight: "500",
  lineHeight: 1.25,
  display: "none",
  "@media (max-width: 600px)": {
    display: "block",
  },
})

const PanelButton = styled.button({
  minWidth: "50px",
  height: "34px",
  width: "fit-content",
  fontSize: 16,
  fontWeight: "700",
  borderRadius: 0,
  border: "none",
  color: "white",
  "&:hover": {
    cursor: "pointer",
    filter: "brightness(0.9)",
  },
})

const Divider = styled.div({
  width: "100%",
  height: 1,
  backgroundColor: "#00000025",
  margin: "8px 0",
  "@media (max-width: 600px)": {
    display: "none",
  },
})
