import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests();

    const convertRequestToListElement = () => {
        return function (req) {
            return `<li>${req.description}</li>`
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