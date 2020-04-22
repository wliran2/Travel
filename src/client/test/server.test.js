const { listening } = require('../../server/server');

describe('test for server side', () => {
    describe('test number 1 for server', () => {
        it('check that the port is right', () => {
            const result = listening();

            expect(result).toBe(undefined);
        });
    });


});