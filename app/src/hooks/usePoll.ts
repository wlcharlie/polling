import { useEffect, useState } from "react"
import { type PollWithResult, fetchPoll } from "../service"

export default function usePoll(id: number | null) {
  const [data, setData] = useState<PollWithResult | null>(null)

  const updatePoll = () => {
    if (!id) return
    fetchPoll(id)
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (!id) return

    fetchPoll(id)
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return [data, updatePoll] as const
}
