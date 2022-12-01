import { html, render } from "lit-html"
import { Driver } from "../model/driver"

const driverComponentTemplate = (driver: Driver) => html`
    <button id="backbutton">Back</button>
    <div>Number: ${driver.driverNumber}</div>
    <div>Name: ${driver.nameDriver}</div>
    <div>Team: ${driver.team}</div>
    <div>Nation: ${driver.nation}</div>`

class DriverComponent extends HTMLElement {
    static get observedAttributes() {
        return ["driverNumber"]
    }

    driverNumber: Driver

    private root: ShadowRoot

    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    attributeChangedCallback(name: string, oldValue: string, value: Driver) {
        this.driverNumber = value
        console.log("Driver is here", this.driverNumber)
        this.render()

    }
    connectedCallback() {
        console.log("driver connected in driver component")
        this.render()
    }
    private render() {
        let driver: Driver
        console.log("IM here")
        driver = this.driverNumber
        render(driverComponentTemplate(driver), this.root)
        this.root.getElementById("backbutton").onclick = () => {
            const event = new CustomEvent("back")
            this.dispatchEvent(event)
        }
        
    }


}
customElements.define("driver-component", DriverComponent)
