import { render } from "./main.js";

const mainContainer = document.querySelector("#container")

//transient state
const applicationState = {
    requests: []
}

const API = "http://localhost:8088";


//reads from db and places them in trans state
export const fetchRquests = () => {
    return fetch(`${API}/requests`).then(
        response => response.json()
        ).then(
            // Store the external state in application state
            serviceRequests =>  applicationState.requests = serviceRequests)
}


//takes the trans state array and makes a copy
export const getRequests = () => {
    return applicationState.requests.map(req => ({...req}));
}

//sends a create rquest to server and makes a new event
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
            
        })
}


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}