const COHORT = `2309-FTB-ET-WEB-FT`;
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;


//object with parties array as property
const object = {
  parties: [],
}

//UL (party list on main page)
const partyList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");

addPartyForm.addEventListener("submit", addPartyForm);

async function render(){
  await getParties()
  renderParties()
}
renderParties()


async function getParties(){
  try {
    let response = await fetch(API_URL)
    let json = await response.json()

    console.log("json.data: ", json.data)

    object.parties = json.data
  } catch (err){
    console.error(error)
  }
}

async function renderParties(){
  if (!object.parties.length){
    partyList.innerHTML = "<li>No Parties. :(<li>"
    return
  }

  const partyCards = object.parties.map((party) => {
    const list = document.createElement("li")
    list.innerHTML = `<h2>${party.name}</h2>
                      <p>${party.date}</p>
                      <p>${party.time}</p>
                      <p>${party.location}</p>
                      <p>${party.description}</p>
                                                 `
    
    //delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "DELETE!"
    deleteBtn.addEventListener("click", () => {
      deleteParty(party.id)
    })
    list.appendChild(deleteBtn);
    return list;

  })

partyList.replaceChildren(...partyCards);

}

async function addParty(event) {
  event.preventDefault()

  let name = addPartyForm.name.value
  let date = addPartyForm.date.value
  let time = addPartyForm.time.value
  let location = addPartyForm.location.value
  let description = addPartyForm.description.value

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      name,
      date,
      time,
      location,
      description,
    }),
  })
  console.log(response)
  renderParties()
}

async function deleteParty(id) {
  const response = await fetch(API_URL + `/${id}`, {
    method: 'DELETE',
  })

  console.log('Deleted?:', response)

  renderParties()
}
