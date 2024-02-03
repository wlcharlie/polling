import styled from "@emotion/styled"
import PollItem from "./components/PollItem"
import PollPanel from "./components/PollPanel"
import usePolls from "./hooks/usePolls"
import { vote } from "./service"
import usePoll from "./hooks/usePoll"
import { useState } from "react"

export default function App() {
  const polls = usePolls()
  const todayPollsId = polls ? polls[0].id : null
  const [selectedPollId, setSelectedPollId] = useState<number | null>(null)

  const currentViewPollId = selectedPollId ?? todayPollsId

  const [poll, update] = usePoll(currentViewPollId)
  const restOfPolls = polls ? polls.filter((poll) => poll.id !== currentViewPollId) : []

  const handleOptionClick = async (pollId: number, optionId: number) => {
    try {
      await vote(pollId, optionId)
      update()
    } catch (e) {
      alert("Failed to vote")
    }
  }

  const handlePollClick = (pollId: number) => {
    setSelectedPollId(pollId)
  }

  return (
    <Container>
      {poll ? (
        <PollPanel
          key={currentViewPollId}
          showToday={poll.id === todayPollsId}
          title={poll.title}
          time={poll.publishedDate}
          options={poll.answer.options}
          answers={poll.result}
          onOptionClick={(optionId) => handleOptionClick(poll.id, optionId)}
        />
      ) : null}
      <PollItemList>
        {restOfPolls?.map((poll) => (
          <PollItem key={poll.id} title={poll.title} time={poll.publishedDate} onClick={() => handlePollClick(poll.id)} />
        ))}
      </PollItemList>
    </Container>
  )
}

const Container = styled.div({
  width: "600px",

  "@media (max-width: 600px)": {
    width: "300px",
  },
})

const PollItemList = styled.div({
  marginTop: 16,
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  "& > *": {
    flex: "1 1 calc(50% - 7px)",
    "&:nth-of-type(odd)": {
      borderRight: "1px solid #DBDBDB",
    },
    "&:not(:nth-last-child(-n+2))": {
      borderBottom: "1px solid #DBDBDB",
    },
    "@media (max-width: 600px)": {
      flex: " 1 1 100%",
      borderRight: "none!important",
      borderBottom: "1px solid #DBDBDB",
    },
  },
})
