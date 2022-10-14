const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.PORT);
        console.log('Database connected.');

        mongoose.connection.on('error', (error) => {
            console.error('Database connection failed:');
            console.error(error);
        });
    } catch (error) {
        console.error('Database error:');
        console.error(error);
        process.exit(1);
    }
};
