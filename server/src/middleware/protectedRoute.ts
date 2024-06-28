import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/helpers/auth';

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
             res.status(401).json({ error: 'Unauthorized - No Token Provided' });
             return
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            res.status(401).json({ error: 'Unauthorized - Invalid Token' });
            return 
        }

        next();
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;
