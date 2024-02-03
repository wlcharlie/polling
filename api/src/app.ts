import express from "express"
import router from "@/router"

const PORT = 3000
const app = express()
app.use(express.json())

router(app)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

app.on("error", (err) => {
  console.error(err)
})
