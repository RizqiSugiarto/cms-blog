class CustomError extends Error {
    public statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

export class UnAuthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401)
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400)
    }
}
