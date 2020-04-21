const { liMaker } = require('../js/toDo');

describe('check the liMaker Function', () => {
    describe('clear all the items from the list', () => {
        it('clear all the items from the list', () => {
            const result = liMaker('');

            expect(result).toBe('');
        });
    });
});