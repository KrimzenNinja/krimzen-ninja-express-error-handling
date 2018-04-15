'use strict';

const errorHandler = require('../src/error-handler');
const boom = require('boom');

describe('ErrorHandler', () => {
    const handle = errorHandler();
    it('should pass through boom errors', () => {
        const error = boom.badRequest('hi');
        expect(boom.isBoom(error)).toBe(true);
        handle(error, null, null, next);
        function next(err) {
            expect(boom.isBoom(err)).toBe(true);
            expect(err).toBe(error);
        }
    });
    it('should wrap non boom errors', () => {
        const error = new Error('test');
        expect(boom.isBoom(error)).toBe(false);
        handle(error, null, null, next);
        function next(err) {
            expect(boom.isBoom(err)).toBe(true);
        }
    });
    it('should wrap strings as internal boom errors', () => {
        const error = 'hi';
        expect(boom.isBoom(error)).toBe(false);
        handle(error, null, null, next);
        function next(err) {
            expect(boom.isBoom(err)).toBe(true);
            expect(err.isServer).toBe(true);
            expect(err.output.statusCode).toBe(500);
        }
    });
    it('should wrap objects as internal boom errors', () => {
        const error = { message: 'hi' };
        expect(boom.isBoom(error)).toBe(false);
        handle(error, null, null, next);
        function next(err) {
            expect(boom.isBoom(err)).toBe(true);
            expect(err.isServer).toBe(true);
            expect(err.output.statusCode).toBe(500);
            expect(err.data).toBe(error);
        }
    });
});
