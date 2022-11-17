import {html, render} from "lit-html"

import store from "../model/store"
import { Driver } from "../model/driver"
import driverService from "../driver-service"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table w3-striped w3-bordered">
        <thead>
            <tr>
            <th>driverNumber</th><th>Name</th><th>Brith Date</th><th>Nation</th><th>Team</th><th>Picture</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (driver: Driver) => html`
    <td>${driver.driverNumber}</td><td>${driver.nameDriver}</td><td>${driver.birthDate}</td><td>${driver.nation}</td>
    <td>${driver.team}</td><img src="${driver.picture}"</td>
`
class DriverTableComponent extends HTMLElement {

    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        store
            .subscribe(model => this.render(model.drivers))
        driverService.fetchDrivers()
    }
    private render(drivers: Driver[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        drivers.forEach(driver => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("driver-selected", {detail: {driver}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(driver), row)
        })
    }
}
customElements.define("driver-table-component", DriverTableComponent)