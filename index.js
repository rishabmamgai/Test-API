require('dotenv').config({path: ".env"});

const app = require('./config/server');
const con = require('./config/dbConfig');


// Home url

app.get('/geoloc/', (req, res) => {
    return res.status(200).send({data: "Home url"});
});


// Query all geolocations

app.get('/geoloc/get-list/', (req, res) => {
    var query = "SELECT * FROM geocoordinates";

    con.query(query, (err, results) => {
        if(err)
            return res.status(500).send({error: "Something went wrong."});

        return res.status(200).send({data: results});
    });
});


// Update a geolocation

app.patch('/geoloc/update/', (req, res) => {
    if('id' in req.query == false || req.query['id'].length < 1)
        return res.status(400).send({error: "Provide record 'id' in url as '/geoloc/update/?id='"});

    var id = req.query['id'];
    var updateData = req.body;

    var query = "UPDATE geocoordinates SET ? WHERE id = ?";

    con.query(query, [updateData, id], (err, results) => {
        if(err)
            return res.status(500).send({error: "Something went wrong. Cannot update."});
        
        else if(results.affectedRows == 0)
            return res.status(404).send({data: "No record found."});
        
        return res.status(200).send({data: results});
    });
});


// Delete a geolocation

app.post('/geoloc/delete/', (req, res) => {
    if('id' in req.body == false)
        return res.status(400).send({error: "Provide record 'id' in body"});

    var id = req.body['id'];

    var query = "DELETE FROM geocoordinates WHERE id = ?";
    
    con.query(query, [id], (err, results) => {
        if(err)
            return res.status(500).send({error: "Something went wrong. Cannot delete."});
        
        else if(results.affectedRows == 0)
            return res.status(404).send({data: "No record found."});
        
        return res.status(200).send({data: results});
    });
});