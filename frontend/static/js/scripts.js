window.onload = () => {
  const results = document.getElementById("results");
  const searchButton = document.getElementById("button");
  const error = document.getElementById("error");
  const eventsSection = document.getElementById("row");
  //If search button is clicked
  searchButton.onclick = () => {
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
        if (data.error) {
          error.innerHTML = "Artist does not exist!"; //if response has error then ask user to enter name again
        } else {
          error.innerHTML = "";
          results.innerHTML = displayResults(data);
          results.scrollIntoView({ behavior: "smooth" });
        }
      });
  }

  //Displaying the artist based on the fetched name
  const displayResults = (artistInfo) => {
    console.log(artistInfo);
    return `
      <h1>Showing results for ${artistInfo.name}</h1>
      <div id=container>
      <div id="card">
        <div id=thumbImage>
            <img src=${artistInfo.thumb_url} alt="Artist image"/>
        </div>
        <div id="artistInfo>
            <p class="cardText">${artistInfo.name}</p>
            <a href=${artistInfo.facebook_page_url} class="cardText">Check out our facebook page</a>
            <button  id="eventButton" onclick="getEvents('${artistInfo.name}')">View Events</button>
        </div>
      </div>
      </div>
    `;
  };

  window.getEvents = (artistName) => {
    fetch(
      `https://rest.bandsintown.com/artists/${artistName}/events?app_id=abc`
    )
      .then((response) => response.json())
      .then((data) => showEvents(data))
  };

  const showEvents = (data) => {
      eventstring = data.map(singleEvent => {
          return`
         <div id="column">
         <div id="card">
         <b>Name</b>
         <p>${singleEvent.title}</p>
         </div>
         </div>`
      })
      .join('')

      eventsSection.innerHTML = eventstring
      eventsSection.scrollIntoView({ behavior: "smooth" });
      
  }
};
