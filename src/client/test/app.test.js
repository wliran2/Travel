const { valid } = require('../js/app');

describe('check the Valid Function', () => {
    describe('empty Place', () => {
        it('check the place is empty', () => {
            const result = valid('');

            expect(result).toBe(false);
        });
    });

    describe('empty Date', () => {
        it('check that place is valid and date is empty', () => {
            const result = valid('Toronto');

            expect(result).toBe(false);
        });
    });




});