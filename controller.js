const con = require('./config/dbConfig');


// Home
function home(req, res) {
    return res.status(200).send({data: "Home url"});
}


// Query all geolocations
function queryData(req, res) {
    var query = "SELECT * FROM geocoordinates";

    con.query(query, (err, results) => {
        if(err)
            return res.status(404).send({error: err});
             
        res.json(results);
    });
}


// Update a geolocation
function updateGeoloc(req, res) {
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
        
        res.json(results);
    });
}


// Delete a geolocation
function deleteGeoloc(req, res) {
    if('id' in req.body == false)
        return res.status(400).send({error: "Provide record 'id' in body"});

    var id = req.body['id'];

    var query = "DELETE FROM geocoordinates WHERE id = ?";

    con.query(query, [id], (err, results) => {
        if(err)
            return res.status(500).send({error: "Something went wrong. Cannot delete."});
        
        else if(results.affectedRows == 0)
            return res.status(404).send({data: "No record found."});
        
        res.json(results);
    });
}


module.exports = {
    home,
    queryData,
    updateGeoloc,
    deleteGeoloc
}
