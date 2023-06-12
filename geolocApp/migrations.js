require('dotenv').config({path : '.env'});

const con = require('../config/dbConfig');


function createTable() {
    var query = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '${process.env.DB_DATABASE}' AND table_name = 'geocoordinates'`;

    con.query(query, async (err, results) => {
        if(err)
            throw err;
    
        if(results.length < 1) {
            var query = "CREATE TABLE geocoordinates(city varchar(50), latitude varchar(15), longitude varchar(15), info varchar(100), id int NOT NULL AUTO_INCREMENT PRIMARY KEY)";
            con.query(query, (err, results) => {
                if(err)
                    throw err;

                console.log("Table created");
            });
    
            var query = "ALTER TABLE geocoordinates AUTO_INCREMENT=100";
            con.query(query, (err, results) => {
                if(err)
                    throw err;
                
                console.log("Id set to AUT_INCREMENT=100");
            });
        }
    });
}


createTable();