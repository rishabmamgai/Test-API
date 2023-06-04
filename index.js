require('dotenv').config({
    path: ".env"
});

const app = require('./config/server');
const con = require('./config/dbConfig');


app.get('/', (req, res) => {
    console.log('Home url');
});


app.post('/geoloc/', (req, res) => {
    const body = req.body;
    const action = body.action;
    const latitude = body.latitude;
    const longitude = body.longitude;

    if (latitude === undefined || longitude === undefined) {
        res.send({
            error: "Provide longitude and latitude."
        });
    }

    if (action === "retrieve") {
        const query = "SELECT * FROM geocoordinates WHERE latitude = ? AND longitude = ?";

        con.query(query, [latitude, longitude], (err, results) => {
            if (err) {
                res.send({
                    error: err
                });
            }

            res.send({
                data: results
            });
        });
    }
    
    else if (action === "update") {
        const info = body.info;

        if (info === undefined) {
            res.send({
                error: "Info missing."
            });
        }

        const query = "UPDATE geocoordinates SET info = ? WHERE latitude = ? AND longitude = ?";

        con.query(query, [info, latitude, longitude], (err, results) => {
            if (err) {
                res.send({
                    error: err
                });
            }

            res.send({
                data: results
            });
        });
    }
    
    else if (action === "delete") {
        const query = "DELETE FROM geocoordinates WHERE latitude = ? AND longitude = ?";

        con.query(query, [latitude, longitude], (err, results) => {
            if (err) {
                res.send({
                    error: err
                });
            }

            res.send({
                data: results
            });
        })
    }
    
    else
        console.error("Invalid request.");
});