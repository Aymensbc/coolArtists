/**
 * @jest-environment jsdom
 */
const {displayResults ,getEvents} = require("./frontend/static/js/scripts");

it("should not be null or undefined", () => {
  const result = displayResults("Maroon 5", "jk");
  expect(result).toBeTruthy();
});


