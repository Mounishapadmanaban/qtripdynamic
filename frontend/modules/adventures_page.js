
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let param=new URLSearchParams(search);
  let city=param.get("city");
  console.log(city);
  return city;

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try{
    let res=await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    // console.log(res.json());
    let adventures=await res.json();
    console.log(adventures);
    return adventures;
  }catch(err){
    console.log(err);
    return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach(element => {
    let div=document.getElementById("data");
div.innerHTML +=` <div class="col-6 col-md-3" >
<a  href="detail/?adventure=${element.id}" target="_blank" id="${element.id}">
  
 <div class="activity-card">
 <div class="category-banner">
 <p>${element.category}</p>
 </div>
    <img src="${element.image}" alt="${element.name}">
    <div class="display">
  <div class="d-flex justify-content-between">
    <h5>${element.name}<h5>
    <p>₹ ${element.costPerHead}</p>
  </div>
  <div class="d-flex justify-content-between align-items-center">
     <h5>duration</h5>
     <p>${element.duration}hours</p>
  </div>
  </div>
 </div>
</a>
</div>`
});
 // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let filteredList=list.filter(element=>{
  return element.duration >= low && element.duration <= high;
  });
  return filteredList;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  console.log(list,categoryList);
  let filteredList=list.filter((element)=>{

  // return element.category == categoryList;
    return categoryList.includes(element.category)
  });
  // console.log(filteredList);
  return filteredList;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // let filteredList=[];
if( (filters.duration !== "") && (filters.category.length !== 0)){
//  let filteredList=filterByCategory(list,filters.category); 
 const arr=(filters.duration).split("-");
//  let low=arr[0];
//  let high=arr[1];
let arr1=[];
filters.category.forEach(ele=>{
  arr1.push(ele);
});
  // let filteredByCategoryList=filterByCategory(list,arr1);
  
//   let filteredByDurationList=filterByDuration(filteredByCategoryList,arr[0],arr[1]);
//   console.log(filteredByDurationList);
//  return filteredByDurationList;
let categoryList=filterByCategory(list,arr1);
let durationList=filterByDuration(categoryList,arr[0],arr[1]);
console.log(durationList);
return durationList;

}else if(filters.duration !== "") {
  const arr=filters.duration.split("-");
  // let low=arr[0];
  // let high=arr[1];
   let durationList=filterByDuration(list,arr[0],arr[1]);
   console.log(durationList);
   return durationList;

}else if(filters.category.length !== 0){
   
  let arr1=[];
  filters.category.forEach(ele=>{
    arr1.push(ele);
  })
  console.log(arr1);
  let categoryList=filterByCategory(list,arr1);
  return categoryList;
 
}// Place holder for functionality to work in the Stubs
 
return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let filterSelected=JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs

  return filterSelected;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  document.getElementById("duration-select").value=filters.duration;

  let selectedPills=document.getElementById("category-list");
let{category:CategoryList}=filters;
CategoryList.forEach(category=>{
  selectedPills.innerHTML +=`
  <div class="category-filter">${category}</div>
  `;



});

  
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
