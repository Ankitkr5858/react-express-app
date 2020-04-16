class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}

class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.status = 422;
    }
}

module.exports = {AuthenticationError, ServiceError};
