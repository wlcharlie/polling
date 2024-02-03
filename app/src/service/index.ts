export type Poll = {
  id: number
  title: string
  publishedDate: number
  answer: {
    type: string
    options: Array<{
      id: number
      label: string
    }>
  }
}

export type PollWithResult = Poll & {
  result: Array<{
    id: number
    votes: number
  }>
}

export async function fetchPolls(): Promise<{ polls: Poll[] }> {
  const response = await fetch("./api/poll")
  const data = await response.json()
  return data
}

export async function fetchPoll(id: number): Promise<PollWithResult> {
  const response = await fetch(`./api/poll/${id}`)
  const data = await response.json()
  return data
}

export async function vote(poll: number, option: number): Promise<boolean> {
  const response = await fetch(`./api/poll/${poll}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option }),
  })
  const data = await response.json()
  return data.message === "success"
}
