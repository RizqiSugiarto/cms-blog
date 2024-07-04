import { Request, Response, NextFunction } from 'express'
import { verifyToken, isAdminToken } from '@/helpers/auth'

export const protectRoute = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(401).json({ error: 'Unauthorized - No Token Provided' })
            return
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            res.status(401).json({ error: 'Unauthorized - Invalid Token' })
            return
        }

        next()
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const onlyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(401).json({ error: 'Unauthorized - No Token Provided' })
            return
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            res.status(401).json({ error: 'Unauthorized - Invalid Token' })
            return
        }
        const isAdmin = await isAdminToken(token)

        if (!isAdmin) {
            res.status(403).json({ error: 'Forbiden Resource - Invalid Role' })
        }

        next()
    } catch (error) {}
}
