const { clearToDoList } = require('../js/toDo');

describe('check the clearToDoList Function', () => {
    describe('clear all the items from the list', () => {
        it('clear all the items from the list', () => {

            const result = clearToDoList('');

            expect(result).toBe('');
        });
    });


});