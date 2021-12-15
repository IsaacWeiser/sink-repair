import { getRequests, deleteRequest } from "./dataAccess.js"

//this function parses through the requests and converts them into li elements
export const Requests = () => {
    const requests = getRequests();

    const convertRequestToListElement = () => {
        return function (req) {
            return `
    <li>
        ${req.description}
        <button class="request__delete"
                id="request--${req.id}">
            Delete
        </button>
    </li>
`
        }
    }
    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement()).join("")
            }
        </ul>
    `
    return html
}


const mainContainer = document.querySelector("#container")

//deletes a request by referencing the object id when you click delete
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})