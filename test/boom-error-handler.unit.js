'use strict';

const boomErrorHandler = require('../src/boom-error-handler');
const httpMocks = require('node-mocks-http');
const boom = require('boom');
const events = require('events');

describe('boomErrorHandler', () => {
    describe('production boomErrorHandler', () => {
        const prodHandler = boomErrorHandler({ exposeServerErrorMessages: false });
        it('Should expose badRequests back to the client', done => {
            const error = boom.badRequest('Naughty!');
            const req = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                    id: 42
                }
            });
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });

            res.on('end', function() {
                const data = JSON.parse(res._getData());
                expect(data.message).toBe('Naughty!');
                expect(data.error).toBe('Bad Request');
                expect(data.statusCode).toBe(400);
                done();
            });

            prodHandler(error, req, res);
        });
        it('Should hide server errors from client', done => {
            const error = boom.internal('Naughty!');
            const req = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                    id: 42
                }
            });
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });

            res.on('end', function() {
                const data = JSON.parse(res._getData());
                expect(data.message).toBe('An internal server error occurred');
                expect(data.error).toBe('Internal Server Error');
                expect(data.statusCode).toBe(500);
                done();
            });

            prodHandler(error, req, res);
        });
    });
    describe('dev boomErrorHandler', () => {
        const devHandler = boomErrorHandler({ exposeServerErrorMessages: true });
        it('Should expose badRequests back to the client', done => {
            const error = boom.badRequest('Naughty!');
            const req = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                    id: 42
                }
            });
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });

            res.on('end', function() {
                const data = JSON.parse(res._getData());
                expect(data.message).toBe('Naughty!');
                expect(data.error).toBe('Bad Request');
                expect(data.statusCode).toBe(400);
                done();
            });

            devHandler(error, req, res);
        });
        it('Should expose server errors to client', done => {
            const error = boom.internal('Naughty!');
            const req = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                    id: 42
                }
            });
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });

            res.on('end', function() {
                const data = JSON.parse(res._getData());
                expect(data.message).toBe('An internal server error occurred');
                expect(data.error).toBe('Internal Server Error');
                expect(data.statusCode).toBe(500);
                expect(data.errMessage).toBe('Naughty!');
                done();
            });

            devHandler(error, req, res);
        });
        it('Should expose server errors data to client', done => {
            const error = boom.internal('Naughty!');
            error.data = {
                hi: true
            };
            const req = httpMocks.createRequest({
                method: 'GET',
                url: '/user/42',
                params: {
                    id: 42
                }
            });
            const res = httpMocks.createResponse({
                eventEmitter: events.EventEmitter
            });

            res.on('end', function() {
                const data = JSON.parse(res._getData());
                expect(data.message).toBe('An internal server error occurred');
                expect(data.error).toBe('Internal Server Error');
                expect(data.statusCode).toBe(500);
                expect(data.errMessage).toBe('Naughty!');
                expect(data.data).toEqual(error.data);
                done();
            });

            devHandler(error, req, res);
        });
    });
});
