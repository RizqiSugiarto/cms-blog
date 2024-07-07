import { Request, Response, NextFunction } from 'express';
import logger from '@/logger';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error('Error:', err.message); 
    logger.error('Stack:', err.stack);   

    res.status(500).json({
        message: err.message || 'Internal Server Error',
    });
}

export default errorHandler;
