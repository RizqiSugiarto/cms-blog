import { Request, Response, NextFunction } from 'express'
import logger from '@/logger'

function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    logger.error('Error:', err.message)
    logger.error('Stack:', err.stack)

    res.status(statusCode).json({ error: message })

    if (statusCode === 500) {
        logger.error('Unhandled error:', err)
    }
}

export default errorHandler
