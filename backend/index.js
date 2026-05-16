import express from "express";
import mongoose from "mongoose";
import calculadoraRouter from "./routers/calculadoraRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

await mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to mongoDB successfully'))
.catch(e => {
  console.log(`Couldn't connect to MongoDB: ${e}`)
  process.exit(1)
})

const app = express()
const port = 8080

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}))
app.use(express.json())

app.use('/calculadora', calculadoraRouter)

app.listen(port, () => {
  console.log(`Stats CM Brasil Backend listening on port ${port}`)
})