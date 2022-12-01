import { html, render } from "lit-html"
import { Driver } from "../model/driver"
import store from "../model/store"

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

    driverNumber: string = "44"

    private root: ShadowRoot

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }

    attributeChangedCallback(name: string, oldValue: string, value: string) {
        this.driverNumber = value
        console.log("Driver is here", this.driverNumber)
        this.render()

    }
    connectedCallback() {
        console.log("driver connected in driver component")
        this.render()

    }
    private render() {
        let driver
        console.log("IM here")
        store.subscribe(model => {
            driver = model.drivers.find(d => d.driverNumber.toString() == this.driverNumber);
            console.log(driver)
        });
        render(driverComponentTemplate(driver), this.root)
        this.root.getElementById("backbutton").onclick = () => {
            const event = new CustomEvent("back")
            this.dispatchEvent(event)
        }

    }


}
customElements.define("driver-component", DriverComponent)
