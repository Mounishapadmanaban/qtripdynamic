import config from "../conf/index.js";
console.log("From init()");

async function init() {
  //Fetches list of all cities along with their images and description
  
  
  
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res=await fetch(config.backendEndpoint + "/cities");
  // console.log(res.json());
  let data=await res.json();
  console.log(data);
  return data;
}catch(err){
  console.log(err);
  return null;
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
const div=document.createElement('div');
div.className="col-sm-6 col-lg-3 mb-4";
div.innerHTML=` "<a href="pages/adventures/?city=${id}" target="_blank" id="${id}">
<div class="tile">
<div class="tile-text text-center text-white"> 
  <h5>"${city}"</h5>
  <P>"${description}"</P>
  </div>
  <img src="${image}" alt="${city.toUpperCase()}" class="img-fluid img-thumbnail">
  
 </div> </a>`
 document.getElementById('data').append(div);

}

export { init, fetchCities, addCityToDOM };
