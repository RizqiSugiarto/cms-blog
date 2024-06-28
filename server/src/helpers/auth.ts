import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET 
const JWT_EXPIRATION = process.env.JWT_EXPIRATION

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET!, { expiresIn: JWT_EXPIRATION })
}

export const verifyToken = (token: string): { userId: string } | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!)
        return decoded as { userId: string }
    } catch (error) {
        return null
    }
}

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
}
