import * as winston from 'winston';
import * as util from 'util';

const prettyJson = winston.format.printf(info => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4)
    }
    return `${info.level}: ${info.message}`
});

const winstonLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.prettyPrint(),
                winston.format.splat(),
                winston.format.simple(),
                prettyJson,
            ),
        })
    ]
});

console.log = function () {
    return winstonLogger.info.apply(winstonLogger, [util.format(...arguments)]);
}
console.error = function () {
    return winstonLogger.error.apply(winstonLogger, [util.format(...arguments)]);
}
console.info = function () {
    return winstonLogger.warn.apply(winstonLogger, [util.format(...arguments)]);
}

console.debug = function () {
    return winstonLogger.debug.apply(winstonLogger, [util.format(...arguments)]);
}
