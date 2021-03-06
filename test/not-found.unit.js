'use strict';

const notFound = require('../src/not-found');

describe('notFound', () => {
    const handle = notFound();
    it('should send a 404 request with `Route not found : req.originalUrl`', () => {
        const req = {
            originalUrl: 'someUrl'
        };
        const res = {};
        res.status = code => {
            res._code = code;
            return res;
        };
        res.json = data => {
            res._data = data;
        };
        handle(req, res);
        expect(res._code).toBe(404);
        expect(res._data.message).toBe(`Route not found : ${req.originalUrl}`);
    });
});
