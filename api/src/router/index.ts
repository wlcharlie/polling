import express from "express"
import { DB } from "@/service"

const router = (app: express.Application) => {
  app.use("/api", api)
}

const api = express.Router()

api.get("/ping", (req, res) => {
  res.json({ message: "pong" })
})

api.get("/poll", (req, res) => {
  DB.listPoll().then((data) => res.json(data))
})
api.get("/poll/:pollId", (req, res) => {
  DB.getPoll(Number(req.params.pollId)).then((data) => res.json(data))
})
api.post("/poll/:poll/vote", (req, res) => {
  DB.vote(Number(req.params.poll), Number(req.body.option)).then((data) => {
    if (data) {
      res.json({ message: "success" })
    } else {
      res.status(400).json({ message: "failed" })
    }
  })
})

export default router
