import express from 'express'
import authRoutes from '@/routes/auth'
import artichelRoutes from '@/routes/artichel'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const port = process.env.APP_PORT || 3000
const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', authRoutes)
app.use('/api/v1', artichelRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
