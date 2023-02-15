import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let param=new URLSearchParams(search);
  let adventureId=param.get("adventure");
  console.log(adventureId);
  return adventureId;

  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res=await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    // console.log(res.json());
    let adventuresDetail=await res.json();
    console.log(adventuresDetail);
    return adventuresDetail;
  }catch(err){
    console.log(err);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventures) {
  
   let heading=document.getElementById("adventure-name");
heading.textContent=adventures.name;

let subtitle=document.getElementById("adventure-subtitle");
subtitle.textContent=adventures.subtitle;
// adventures[images].foreach(element=>{
  for (const image of adventures.images) {
    // `item` is the array element, **not** the index
    let imageGallery=document.getElementById("photo-gallery");

  let img=document.createElement("img");

 img.className="activity-card-image";
  img.setAttribute("src",image);
  
     imageGallery.append(img);
 }
  let content=document.getElementById("adventure-content");
  let experience=document.createElement("div");
  experience.className="experience-content";
  experience.textContent=adventures.content;
  content.append(experience);
     
// })

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {


document.getElementById("photo-gallery").innerHTML =`<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id="slides">  </div>
  
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
images.forEach( (ele,ind)=> {
  document.getElementById("slides").innerHTML +=` <div class="${"carousel-item " +  (ind===0  ?  "active" : "")}">
  <img src=${ele} class="d-block w-100" alt="...">
</div>
  `
});

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  console.log(adventure);
  if(adventure.available===true){
    console.log("available");
    const show=document.getElementById("reservation-panel-sold-out");
    show.style.display="none";
    const form=document.getElementById("reservation-panel-available");
    form.style.display="block";
    const cost=document.getElementById("reservation-person-cost");
    cost.innerHTML=adventure.costPerHead;
  }
  else if(adventure.available===false)
  {
    console.log("not available");
    const show=document.getElementById("reservation-panel-sold-out");
    show.style.display="block";
    const form=document.getElementById("reservation-panel-available");
    form.style.display="none";

  }
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // console.log(persons);
  // let costing=document.getElementById("reservation-person-cost").textContent
  // console.log(costing); 
  let total=persons * (adventure.costPerHead);
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById("reservation-cost").innerHTML=total ;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
const myForm=document.getElementById("myForm");
console.log(myForm);
const url=config.backendEndpoint +`/reservations/new`;
myForm.addEventListener("submit",async event=>{
  event.preventDefault();
  try{
    await fetch(url,{
      method:'POST',
      body:JSON.stringify({
        name:myForm.elements.name.value,
        date:myForm.elements.date.value,
        person:myForm.elements.person.value,
        adventure:adventure.id
      }),
      headers:{"Content-Type":"application/json"}
    })
    alert("Success!")
  }
  catch(e){
    alert("Failed!")
  }
})

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {

  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}else{
  document.getElementById("reserved-banner").style.display="none" ;
}

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
