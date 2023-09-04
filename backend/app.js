let dotenv = require('dotenv');
let cors = require('cors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');

let winston = require('./config/winston');
let indexRouter = require('./routes/index');
let mongoose = require('./db/conn');

let app = express();
dotenv.config();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            //puede consultar la api
            callback(null, true);
        } else {
            //no puede consultar la api
            callback(new Error('No permitido por CORS'));
        }
    },
}

app.use(cors(corsOptions));

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);

//error handler
app.use(function (err, req, res, next) {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // include winston logging
    winston.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    //render the error page
    res.status(err.status || 500);
    res.json({ "message": "An error occurred" });
});

module.exports = app;
