const express = require('express');
const agenda = require('./routes/agenda');

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', process.env.ACCES_CONTROL];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.json({
        message: 'ok'
    });
});


app.use('/agenda', agenda);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({
        'message': err.message
    });
    return;
});


app.use(function (req, res) {
    res.status(404);
    res.json({
        error: "Sorry, can't find that"
    });
});


module.exports = app;