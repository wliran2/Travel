const { valid } = require('../js/app');

describe('check the Error message', () => {
    describe('empty Place', () => {
        it('check the place is empty', () => {
            const result = valid('');

            expect(result).toBe(false);
        });
    });
});