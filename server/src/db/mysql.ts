import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const connectDb = new DataSource({
    url: process.env.DATABASE_URL,
    type: 'mysql',
    driver: require('mysql2'),
    connectTimeout: 60000,
    extra: {
        connectionLimit: 10,
        connectTimeout: 60000
    },
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
