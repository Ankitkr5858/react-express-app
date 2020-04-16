const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const routesInitializer = require('./routes');

module.exports = async (app) => {
    await mongooseLoader();
    console.log('MongoDB Intialized');
    await expressLoader(app);
    console.log('Express Intialized');
    routesInitializer(app);
    console.log('Routes Intialized');
};
