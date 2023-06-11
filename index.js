require('./config/dbConfig');
require('./geolocApp/router');

const app = require('./config/server');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views\\templates');
// app.use(express.static(__dirname + '\\views\\partials'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());