const cors = require('cors');
const auth = require('../middlewares/auth');

const whitelist = ['http://localhost:3000'];

module.exports = (app) => {
    app.json();
    app.use(cors());
    app.use(auth());
};
