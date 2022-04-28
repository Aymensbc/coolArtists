window.onload = () => {
  const results = document.getElementById("results");
  const searchButton = document.getElementById("button");
  let result=null;

  searchButton.onclick = () => {
    if (document.getElementById("artistName").value !== "") {
      const ArtistName = document.getElementById("artistName").value;
      getResponse(ArtistName)
    } else {
      alert("Please Enter an Artist's name");
    }
  };

  async function getResponse(name){
    result= fetch(`https://rest.bandsintown.com/artists/${name}?app_id=abc`)
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  console.log(result)
};
