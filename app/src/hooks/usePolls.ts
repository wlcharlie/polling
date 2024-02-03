import { useEffect, useState } from "react"
import { type Poll, fetchPolls } from "../service"

export default function usePolls() {
  const [data, setData] = useState<{ polls: Poll[] } | null>(null)

  useEffect(() => {
    fetchPolls()
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return data ? data.polls : null
}
