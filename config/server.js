require('dotenv').config({path : ".env"});

const express = require('express');
const app = express();


app.listen(process.env.SERVER_PORT || 5000, function(err) {
    if(err)
        console.error(`Server Down \n ${err}`);

    else
        console.log(`Server running at port : ${process.env.SERVER_PORT || 5000}`);
});

module.exports = app;