const sessionRoute = require('../routes/session');

module.exports = (app) => {
    app.use('/', sessionRoute);

    // catch 404
    app.use((req, res, next) => {
        res.status(404).send('Not found');
    });

    // error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.status(500).send({error: err.message || 'Something went wrong' });
    });

    return app;
};
