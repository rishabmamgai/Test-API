require('dotenv').config({path : ".env"});

const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views\\templates');
// app.use(express.static(__dirname + '\\views\\partials'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(process.env.SERVER_PORT || 5000, function(err) {
    if(err)
        console.error(`Server Down \n ${err}`);

    else
        console.log(`Server running at port : ${process.env.SERVER_PORT || 5000}`);
});

module.exports = app;