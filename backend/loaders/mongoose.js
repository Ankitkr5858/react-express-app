const mongoose = require('mongoose');

module.exports = async () => {
    const dbUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/reactExpressApp';
    const connection = await mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
    return connection.connection.db;
};
