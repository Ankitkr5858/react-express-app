const sessionRoute = require('../routes/session');
const usersRoute = require('../routes/users');

/**
 * Initiates all Express Routes and error handlers
 */
module.exports = (app) => {
    app.use('/api', sessionRoute);
    app.use('/api/user', usersRoute);

    // catch 404
    app.use((req, res, next) => {
        res.sendFile('index.html', {root: __dirname + '/../public'});
    });

    // error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500).send({error: err.message || 'Something went wrong' });
    });

    return app;
};
