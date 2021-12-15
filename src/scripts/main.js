import { SinkRepair } from "./SinkRepair.js"
import { fetchRquests } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")


//gets data from server, loads into trans state, copies and 
//converts to html, and displays fresh service form
export const render = () => {
    fetchRquests().then(()=> {
       return mainContainer.innerHTML = SinkRepair()
    })  
}

render()

