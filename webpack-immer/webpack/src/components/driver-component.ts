import { html, render } from "lit-html"
import { Driver } from "../model/driver"
import store from "../model/store"

const driverComponentTemplate = (driver: Driver) => html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>
        .myDiv {
            background: #f5f5f5;
            font-size: 28px;
            text-align: center;
            border: 1px solid #FFF;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            box-shadow: 1px 2px 4px rgba(0,0,0,.4);
        }
        .button {
            background-color: #FF0000; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 40px;
            margin: 4px 2px;
            cursor: pointer;
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
        }
        .button2:hover {
            box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
        }
    </style>
    <button id="backbutton" class="button button2"
    style="height: 100px; width: 1000px;">Back</button>
    <div class="myDiv">Number: ${driver.driverNumber}</div>
    <div class="myDiv">Name: ${driver.nameDriver}</div>
    <div class="myDiv">Team: ${driver.team}</div>
    <div class="myDiv">Nation: ${driver.nation}</div>
    <div class="myDiv"><img src="${driver.picture}"</div>`

class DriverComponent extends HTMLElement {
    static get observedAttributes() {
        return ["drivernumber"]     //lowercase
    }

    driverNumber: string = "33"

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
            console.log("BACK")
            this.dispatchEvent(event)
        }

    }


}
customElements.define("driver-component", DriverComponent)


