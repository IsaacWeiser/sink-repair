import { SinkRepair } from "./SinkRepair.js"
import { fetchRquests } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

export const render = () => {
    fetchRquests().then(()=> {
       return mainContainer.innerHTML = SinkRepair()
    })  
}

render()

