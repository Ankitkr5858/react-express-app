const mongoose = require('mongoose');

/**
 * Initiates connection to MongoDB
 */
module.exports = async () => {
    const dbUri = process.env.DATABASE_URL;
    const connection = await mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
    return connection.connection.db;
};
