/**
 * @jest-environment jsdom
 */
const { displayResults, getEvents } = require("./frontend/static/js/scripts");

it("should not be null or undefined", () => {
  const result = displayResults("Maroon 5", "jk");
  expect(result).toBeTruthy();
});

it("should return 0 if event count is 0" ,  () => {
  document.body.innerHTML= `<div id="eventHeading"></div>`;
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  const result = getEvents("Maroon 5", 0);
  expect(result).toBe(0);
})

it("should change inner text  if event count is 0" ,() => {
  document.body.innerHTML= `<div id="eventHeading"></div>`;
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  const result = getEvents("Coldplay", 0);
  expect(document.getElementById("eventHeading").innerHTML).toBe("No upcoming events");
})
