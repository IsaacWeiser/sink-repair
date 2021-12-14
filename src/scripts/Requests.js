import { getRequests, deleteRequest } from "./dataAccess.js"

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

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})