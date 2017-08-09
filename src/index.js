const debug = require('debug')('krimzen-ninja-express-error-handling');
const boom = require('boom');
const _ = require('lodash/lang');
import { IsRequiredError } from 'krimzen-ninja-common-errors';

export default function initialise(options) {
    debug('Initialising');
    if (!options.name) {
        throw new IsRequiredError('options.name', initialise.name);
    }
    if (!options.app) {
        throw new IsRequiredError('options.app', initialise.name);
    }
    options.exposeServerErrorMessages = options.exposeServerErrorMessages || false;
    options.app.use(ErrorHandler());
    options.app.use(BoomErrorHandler(options));
    options.app.use(NotFound());
    options.logger = options.logger || console;
    debug('Initialised');
}

function ErrorHandler() {
    return function errorHandler(err, req, res, next) {
        if (err.isBoom) {
            return next(err);
        }
        const statusCode = err.statusCode || 500;
        if (_.isError(err)) {
            return next(boom.wrap(err, statusCode));
        }
        if (_.isString(err)) {
            return next(boom.create(statusCode, err));
        }
        return next(boom.create(statusCode, 'Error', err));
    };
}

function BoomErrorHandler(options) {
    // eslint-disable-next-line no-unused-vars
    return function boomErrorHandler(err, req, res, next) {
        if (err.isServer) {
            options.logger.error('Server Error :', err);
        } else {
            options.logger.warn('Client Error :', err);
        }
        if (options.exposeServerErrorMessages && err.isServer) {
            const messageToLog = err.output.payload;
            if (err.data) {
                messageToLog.data = err.data;
            }
            messageToLog.errMessage = err.message;
            res.status(err.output.statusCode).set(err.output.headers).json(messageToLog);
            return;
        }
        res.status(err.output.statusCode).set(err.output.headers).json(err.output.payload);
    };
}

function NotFound() {
    return function notFound(req, res) {
        res.status(404).json({ message: 'Route not found : ' + req.originalUrl });
    };
}
