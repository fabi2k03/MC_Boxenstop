import { html, render } from "lit-html"

const template = html`
    <div>Driver: Max Mustermann</div>
`

class DriverComponent extends HTMLElement {
    static get observedAttributes() {
        return ["driverNumber"]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log("TODO: display driver", value)
    }
    connectedCallback() {
        console.log("driver connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }


}

customElements.define("driver-component", DriverComponent)
