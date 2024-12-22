const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(`${ process.env.URI }`);
        console.log('Connected to the Database');
    } catch (error) {
        console.log('Error while connecting with the database', error);
    }
};

module.exports = dbConnection;