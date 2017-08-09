import initialise from '../src';
import { IsRequiredError } from 'krimzen-ninja-common-errors';
import express from 'express';

describe('expressErrorHandler', () => {
    describe('initialise', function() {
        it('should throw an error if no options provided', () => {
            expect(() => initialise()).toThrow(TypeError);
        });
        it('should throw an error if name was not provided', () => {
            expect(() => initialise({})).toThrow(IsRequiredError);
            expect(() => initialise({})).toThrow(/options\.name/);
        });
        it('should throw an error if app was not provided', () => {
            expect(() => initialise({ name: 'asd' })).toThrow(IsRequiredError);
            expect(() => initialise({ name: 'asd' })).toThrow(/options\.app/);
        });
        it('should should succeed for the happy case', () => {
            const app = new express();
            initialise({
                name: 'test',
                app
            });
        });
    });
});
