const results = document.getElementById("results");
const searchButton = document.getElementById("button");
const error = document.getElementById("error");
const eventHeading = document.getElementById("eventHeading");
const eventsSection = document.getElementById("row");
const inputBar = document.getElementById("artistName")


window.onload = () => {
  //If enter key is pressed instead of clicking on search button
  inputBar.onkeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  }

  //If search button is clicked then fetch the artist's name
  searchButton.onclick = () => {
    //clear all innerHTML when the search button is clicked
    results.innerHTML = "";
    error.innerHTML = "";
    eventHeading.innerHTML = "";
    eventsSection.innerHTML = "";

    //if anything is entered in the search bar
    //GetReponse will fetch artists info based onn the name enetered in the search bar
    if (document.getElementById("artistName").value !== "") {
      const artistName = document.getElementById("artistName").value;
      getResponse(artistName);
    } else {
      error.innerHTML = "Please enter an Artist's name!"; //if user has not entered any name then ask the user to enter name again
    }
  };
};

//Fetching data from API using the Artist's name
async function getResponse(name) {
  try {
    fetch(`https://rest.bandsintown.com/artists/${name}?app_id=abc`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error || !data) {
          error.innerHTML = "Artist does not exist!"; //if response has error then ask user to enter name again.
          return 0;
        } else {
          error.innerHTML = "";
          results.innerHTML = displayResults(data, name);
          results.scrollIntoView({ behavior: "smooth" });
          return 1;
        }
      });
  } catch (e) {
    return 0;
  }
}

//Displaying the artist based on the fetched name. A card will appear beneath the header
//In the template literal a button is added with the id "eventButton". Its click will call getEvents function
const displayResults = (artistInfo, name) => {
  console.log(artistInfo)
  let twitter=null;
  let website=null;
  if (artistInfo.links[0]) {
    artistInfo.links.map(link => {
      if (link.type === "website")
        website = link.url;
      if (link.type === "twitter")
        twitter = link.url;
    })
  }
  return `
      <h1>Showing results for "${name}"</h1>
      <div id=container>
      <div id="card">
        <div id=thumbImage>
            <img src=${artistInfo.thumb_url} alt="Artist image"/>
        </div>
        <div id="artistInfo">
            <h3>${artistInfo.name}</h3>
            <div id="links">
            <a target="_blank" href=${artistInfo.facebook_page_url}><i class="fa-brands fa-lg fa-facebook"></i></a>
            ${twitter?`<a target="_blank" href=${twitter}><i class="fab fa-lg fa-twitter"></i></a>`:''}
            ${website?`<a target="_blank" href=${website}><i class="fa-solid fa-link"></i></a>`:''}
            </div>
            <button  id="eventButton" onclick="getEvents('${artistInfo.name}','${artistInfo.upcoming_event_count}')">View Upcoming Events</button>
            <br>
            <button id="eventButton" onClick="getPastEvents('${artistInfo.name}')">View Past Events</button>
            </div>
      </div>
      </div>
    `;
};

//when #eventButton button is clicked .It will fetch events based on artistName
//Incase of no events, fetch call is not made.
window.getEvents = (artistName, eventCount) => {
  if (eventCount === 0) {
    document.getElementById("eventHeading").innerHTML = "No upcoming events";
    document.getElementById("eventHeading").scrollIntoView({ behavior: "smooth" });
    return 0;
  } else {
    try {
      fetch(
        `https://rest.bandsintown.com/artists/${artistName}/events?app_id=abc`
      )
        .then((response) => response.json())
        .then((data) => {
          eventHeading.innerHTML = `${eventCount} upcoming events`;
          eventHeading.scrollIntoView({ behavior: "smooth" });
          showEvents(data);
        });
    } catch (e) {
      return e;
    }
  }
};

//Fetch past events when the second events button is clicked.
window.getPastEvents = (name) => {
  try {
    fetch(`https://rest.bandsintown.com/artists/${name}/events?app_id=abc&date=past`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length == 0) {
          eventHeading.innerHTML = "No past Events found";
          eventHeading.scrollIntoView({ behavior: "smooth" });
        }
        else {
          eventHeading.innerHTML = `${data.length} past events found`;
          eventHeading.scrollIntoView({ behavior: "smooth" });
          showEvents(data);
        }
      })
  } catch (e) {
    return e;
  }
}

//Used to display the event cards showing country , time date and city.
const showEvents = (data) => {
  eventstring = data.map((singleEvent) => {
    //map will loop over all the events
    date = new Date(singleEvent.datetime);
    return `
         <div id="column">
         <p>Event Details</p>
         <hr>
         <div id="cardRow">
            <div id="cardColumn">
            <div id="topRow">
                <p><b>Country</b></p>
                <p>${singleEvent.venue.country}</p>
            </div>
                <p><b>City</b></p>
                <p>${singleEvent.venue.city}</p>
            </div>
            <div id="cardColumn">
            <div id="topRow">
            <p><b>Time</b></p>
            <p>${date.toLocaleTimeString("en", { timeStyle: "short", hour12: true, timeZone: "UTC", })}</p>
            </div>
            <p><b>Date</b></p>
            <p>${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</p>
            </div>
         </div>
         </div>`;
  })
    .join("");
  eventsSection.innerHTML = eventstring;
  eventsSection.scrollIntoView({ behavior: "smooth" });
};

//exports tested in scripts.test.js file
module.exports = { displayResults, getEvents };
