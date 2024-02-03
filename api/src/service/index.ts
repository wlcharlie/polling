import fs from "fs"
import path from "path"

function genRandomId(): string {
  return String(Math.floor(Math.random() * 100000))
}

// mocking like a real database
export class DB {
  // is actually at ./api/src/data/poll.json
  static pollPath = path.join(__dirname, "..", "data", "poll.json")
  static pollResultPath = path.join(__dirname, "..", "data", "poll-result.json")

  static async listPoll() {
    //read the file
    const data = fs.readFileSync(this.pollPath, "utf8")
    return JSON.parse(data)
  }

  static async getPoll(id: number) {
    const data = fs.readFileSync(this.pollPath, "utf8")
    const poll = JSON.parse(data).polls.find((poll: any) => poll.id === id)
    const groupAnswers = poll.answer.options.map((option: any) => ({
      id: option.id,
      votes: 0,
    }))

    const data2 = fs.readFileSync(this.pollResultPath, "utf8")
    const result = JSON.parse(data2).results.filter((result: any) => result.pollId === id)
    result.forEach((result: any) => {
      groupAnswers.find((groupAnswer: any) => groupAnswer.id === result.pollOptionId).votes++
    })

    return {
      ...poll,
      result: groupAnswers,
    }
  }

  static async vote(id: number, option: number) {
    const data = fs.readFileSync(this.pollResultPath, "utf8")
    const results = JSON.parse(data).results
    results.push({ id: genRandomId(), pollId: id, pollOptionId: option })
    fs.writeFileSync(this.pollResultPath, JSON.stringify({ results }, null, 2))
    return true
  }
}
