import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()



const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`)
})
