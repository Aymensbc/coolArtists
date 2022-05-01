/**
 * @jest-environment jsdom
 */

//imports from scripts.js
const { displayResults, getEvents } = require("./frontend/static/js/scripts");

//the display response shouldnt be null or undefined
it("should not be null or undefined", () => {
  const result = displayResults({links:{}}, "jk");
  expect(result).toBeTruthy();
});

//if number of events is 0 , then the function should return 0
it("should return 0 if event count is 0" ,  () => {
  document.body.innerHTML= `<div id="eventHeading"></div>`; 
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  const result = getEvents("Maroon 5", 0);
  expect(result).toBe(0);
})

//if number of events is 0 then no upcoming events should appear beneath the artist card.
it("should change inner text  if event count is 0" ,() => {
  document.body.innerHTML= `<div id="eventHeading"></div>`;
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  const result = getEvents("Coldplay", 0);
  expect(document.getElementById("eventHeading").innerHTML).toBe("No upcoming events");
})

