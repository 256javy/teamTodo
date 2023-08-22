const appRoot = require("app-root-path");
const winston = require("winston");
const dotenv = require("dotenv");

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Define el nivel de log a partir de la variable de entorno LOG_LEVEL
const logLevel = process.env.LOG_LEVEL || "info";

// Define las opciones para cada transporte (archivo, consola)
const options = {
    file: {
        level: logLevel,
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
        tailable: true,
        zippedArchive: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            myFormat
        ),
    },
    console: {
        level: logLevel,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    },
};

// Crea un nuevo logger de Winston con las opciones definidas anteriormente
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // no salir en caso de excepciones manejadas
});

// Crea un objeto stream con una función 'write' que será utilizada por `morgan`
logger.stream = {
    write: function (message, encoding) {
        // utiliza el nivel de log 'info' para que la salida sea recogida por ambos
        // transportes (archivo y consola)
        logger.info(message);
    },
};

module.exports = logger;