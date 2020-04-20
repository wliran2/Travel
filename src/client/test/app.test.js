const { valid } = require('../js/app');

test('check that the city is empty', () => {
    expect(valid('newPlace')).toBe(true);
});

test("It should get a response from method", () => {
    expect(200);
});