const app = require('./config/server');
const { home, queryData, updateGeoloc, deleteGeoloc } = require('./controller.js');


app.get('/geoloc/', home);
app.get('/geoloc/get-list/', queryData);
app.patch('/geoloc/update/',updateGeoloc);
app.post('/geoloc/delete/', deleteGeoloc);