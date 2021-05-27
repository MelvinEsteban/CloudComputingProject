const express = require('express') ;
const agenda = require('./routes/agenda') ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});


app.use('/agenda', agenda);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});


app.use(function(req, res){
    res.status(404);
    res.json({ error: "Sorry, can't find that" });
  });


module.exports = app;