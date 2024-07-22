import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production';

const connectDb = new DataSource({
    url: process.env.DATABASE_URL,
    type: 'mysql',
    driver: require('mysql2'),
    connectTimeout: 60000,
    extra: {
        connectionLimit: 10,
        connectTimeout: 60000
    },
    synchronize: !isProduction,
    logging: !isProduction,
    entities: isProduction ? ['./dist/entity/**/*.js'] : ['./src/entity/**/*.ts'],
    migrations: isProduction ? ['./dist/migration/**/*.js'] : ['./src/migration/**/*.ts'],
    
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
