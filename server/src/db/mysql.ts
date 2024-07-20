import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const connectDb = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['./src/entity/**/*.ts'],
})

connectDb
    .initialize()
    .then(() => {
        console.log(`Data source has been initialized`)
    })
    .catch((error) => {
        console.log(`Error:`, error)
    })

export default connectDb
