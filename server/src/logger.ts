import { createLogger, transports, format } from 'winston';

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({ filename: 'error.log', level: 'error' })
    ],
});

export default logger;
