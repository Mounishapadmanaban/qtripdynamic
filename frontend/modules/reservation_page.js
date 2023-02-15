import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {

  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
let res=await fetch(config.backendEndpoint+'/reservations')
let data=await res.json();
console.log(data);
return data;
  }

catch(e){
  return null;
}
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
console.log(reservations)
  //Conditionally render the no-reservation-banner and reservation-table-parent
if(reservations && reservations.length){
  document.getElementById("reservation-table-parent").style.display="block"
  document.getElementById("no-reservation-banner").style.display="none"
  reservations.forEach(res=>{
console.log(res);
let table=document.getElementById("reservation-table")
let row=document.createElement("tr");

row.innerHTML=`<td>${res.id}</td>
<td>${res.name}</td>
<td>${res.adventureName}</td>
<td>${res.person}</td>
<td>${new Date(res.date).toLocaleDateString('en-IN')}</td>
<td>${res.price}</td>
<td>${new Date(res.time).toLocaleString('en-IN',{
  month:"long",
  day:"numeric",
  year:"numeric",
  hour:"numeric",
  minute:"numeric",
  second:"numeric",
  hour12:true}).replace(' at', ',')}</td>
<td><button id=${res.id} class="reservation-visit-button"><a href="../detail/?adventure=${res.adventure}">visit adventure</a></button></td>
`
table.append(row);
});
}

 else{
  document.getElementById("no-reservation-banner").style.display="block"
  document.getElementById("reservation-table-parent").style.display="none"
 } /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
