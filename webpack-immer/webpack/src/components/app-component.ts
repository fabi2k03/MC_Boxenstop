import {html, render} from "lit-html"
import "./driver-table-component"
import "./driver-component"

const appComponentTemplate = html`
    <driver-table-component id="table"></driver-table-component>
    <driver-component id="driver"></driver-component>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("connected")
        this.render()

    }
    render() {
        render(appComponentTemplate, this.shadowRoot)
        const driverTableComponent = this.shadowRoot.getElementById("table")
        const driverComponent: HTMLElement = this.shadowRoot.querySelector("driver-component")
        driverTableComponent.addEventListener("driver-selected", (e: CustomEvent) => {
            const driver = e.detail.driver
            console.log("driver selected", driver)
            driverComponent.setAttribute("driverNumber", driver.driverNumber)
            driverTableComponent.style.display = "none"
            driverComponent.style.display = "block"
        })
    }
}

customElements.define("app-component", AppComponent)