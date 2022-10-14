const express = require('express');
const routes = require('./src/config/routes');

init();

async function init() {
    require('dotenv').config();
    await require('./src/config/mongoose')();

    const app = express();
    require('./src/config/express')(app);
    app.use(routes);

    app.listen(process.env.PORT, () =>
        console.log('REST API is running on port: ' + process.env.PORT)
    );
}
