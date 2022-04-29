window.onload = () => {
  const results = document.getElementById("results");
  const searchButton = document.getElementById("button");
  const error = document.getElementById("error");
  const eventHeading = document.getElementById("eventHeading");
  const eventsSection = document.getElementById("row");

  //If search button is clicked
  searchButton.onclick = () => {
    results.innerHTML = "";
    error.innerHTML = "";
    eventHeading.innerHTML = "";
    eventsSection.innerHTML = "";

    if (document.getElementById("artistName").value !== "") {
      const ArtistName = document.getElementById("artistName").value;
      getResponse(ArtistName);
    } else {
      //if user has not entered any name then ask the user to enter name again
      error.innerHTML = "Please enter an Artist's name!";
    }
  };

  //Fetching data from API using the Artsit's name
  async function getResponse(name) {
    fetch(`https://rest.bandsintown.com/artists/${name}?app_id=abc`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error || !data) {
          error.innerHTML = "Artist does not exist!"; //if response has error then ask user to enter name again
        } else {
          error.innerHTML = "";
          results.innerHTML = displayResults(data,name);
          results.scrollIntoView({ behavior: "smooth" });
        }
      });
  }

  //Displaying the artist based on the fetched name
  const displayResults = (artistInfo,name) => {
    console.log(artistInfo);
    return `
      <h1>Showing results for ${name}</h1>
      <div id=container>
      <div id="card">
        <div id=thumbImage>
            <img src=${artistInfo.thumb_url} alt="Artist image"/>
        </div>
        <div id="artistInfo">
            <h3>${artistInfo.name}</h3>
            <div id="links">
            <a href=${artistInfo.facebook_page_url}><i class="fa-brands fa-lg fa-facebook"></i></a>
            </div>
            <button  id="eventButton" onclick="getEvents('${artistInfo.name}','${artistInfo.upcoming_event_count}')">View Events</button>
        </div>
      </div>
      </div>
    `;
  };

  window.getEvents = (artistName, eventCount) => {
    fetch(
      `https://rest.bandsintown.com/artists/${artistName}/events?app_id=abc`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0 || eventCount === 0) {
          eventHeading.innerHTML = "No upcoming events";
          eventHeading.scrollIntoView({ behavior: "smooth" });
        } else {
          eventHeading.innerHTML = `${eventCount} upcoming events`;
          eventHeading.scrollIntoView({ behavior: "smooth" });
          showEvents(data);
        }
      });
  };

  const showEvents = (data) => {
    console.log(data);
    eventstring = data
      .map((singleEvent) => {
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
            <p>${date.toLocaleTimeString("en", {
              timeStyle: "short",
              hour12: true,
              timeZone: "UTC",
            })}</p>
            </div>
            <p><b>Date</b></p>
            <p>${
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate()
            }</p>
            </div>
         </div>
         </div>`;
      })
      .join("");

    eventsSection.innerHTML = eventstring;
    eventsSection.scrollIntoView({ behavior: "smooth" });
  };
};
