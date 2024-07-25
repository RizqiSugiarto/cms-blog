import express from 'express'
import authRoutes from '@/routes/auth'
import blogRoutes from '@/routes/blog'
import userRoutes from '@/routes/user'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors, {CorsOptions} from 'cors'
import errorHandler from './middleware/errorHandler'
import path from 'path'

dotenv.config()

const port = process.env.APP_PORT || 3000
const mode = process.env.NODE_ENV
const app = express()
const publicPath = path.join(__dirname, '../public/uploads')

const allowedOrigins = [
    'https://simpleblogcms.netlify.app',
    'https://simpleblogwithcms.netlify.app',
    'http://localhost:3000'
];

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Check if origin is in the allowed origins array
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
app.use('/api/v1/users', userRoutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Running in ${mode} mode`)
})
