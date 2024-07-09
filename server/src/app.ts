import express from 'express'
import authRoutes from '@/routes/auth'
import blogRoutes from '@/routes/blog'
import likeRoutes from '@/routes/like'
import viewRoutes from '@/routes/view'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'

dotenv.config()

const port = process.env.APP_PORT || 3000
const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/like', likeRoutes)
app.use('/api/v1/view', viewRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
