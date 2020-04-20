const { liMaker } = require('../js/app');

test('check that the text field is empty', () => {

    expect(liMaker('text')).toBe('text');
});