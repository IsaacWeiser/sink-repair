import { render } from "./main.js";

const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: []
}

const API = "http://localhost:8088";

export const fetchRquests = () => {
    return fetch(`${API}/requests`).then(
        response => response.json()
        ).then(
            // Store the external state in application state
            serviceRequests =>  applicationState.requests = serviceRequests)
}

export const getRequests = () => {
    return applicationState.requests.map(req => ({...req}));
}


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