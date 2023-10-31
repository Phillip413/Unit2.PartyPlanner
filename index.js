const COHORT = `2309-FTB-ET-WEB-FT`;
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;


//object with events array as a property
const state = {
  events: []
}

const partyList = document.getElementById("party-list");

const partyForm = documnet.getElementById("party-form");

async function createEvent(event) {
  event.preventDefault();
  try{
    const response = await fetch (API + "/events", {
      method: "POST",
      headers: {"Content-type": "application/JSON"}, //information for how we format request
      
      //object that represents the thing we want to create
      body: JSON.stringify ({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value ,
        date: `${document.getElementById("date").value}:00.000Z`,
        location: document.getElementById("location").value,
      })
    });
    getParties();

  }catch(error){
    console.error(error)
  }
}

partyForm.addEventListener("submit", createEvent)

async function getParties() {
  try {
      const response = await fetch(API + "/events");
      const json = await response.json();
      state.events = json.data;
      render();

  } catch (error) {
      console.error(error);
  }
}


function render(){
  const events = state.events.map((event)=>{
    const article = document.createElement("article");
    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", async() => {
      try {
        const response = await fetch(API + `/events/${event.id}`, {method:"DELETE"});
        getParties();
      } catch (error) {
        console.error(error)
      }
    })
    deleteBtn.innertext = "DELETE"

    article.innerHTML =
                          `<h3> ${event.name}</h3>
                          <address>${event.location}</address>`

    article.append(deleteBtn);
    
    return article;

    partyList.replaceChildren(...events); //take party list and replace everything that was there with values in events            
  })
}

getEvents();
