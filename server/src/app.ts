import express from 'express'
import authRoutes from '@/routes/auth'
import blogRoutes from '@/routes/blog'
import likeRoutes from '@/routes/like'
import viewRoutes from '@/routes/view'
import userRoutes from '@/routes/user'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import path from 'path'

dotenv.config()

const port = process.env.APP_PORT || 3000
const mode = process.env.NODE_ENV
const app = express()
const publicPath = path.join(__dirname, '../public/uploads')

const corsOptions = {
    origin: 'https://simpleblogcms.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Web-App'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions))
app.use('/uploads', express.static(publicPath))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/like', likeRoutes)
app.use('/api/v1/view', viewRoutes)
app.use('/api/v1/users', userRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Running in ${mode} mode`)
})
