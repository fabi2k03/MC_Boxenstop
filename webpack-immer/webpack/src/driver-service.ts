
import produce from "immer";
import store from "./model/store"
import { Driver } from "./model/driver";
const url = "https://www.jsonkeeper.com/b/Q0Z9" /*"https://jsonkeeper.com/b/SU0P"*/

class DriverService {
    async fetchDrivers() {
        const response = await fetch(url)
        let drivers: [Driver] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.drivers = drivers
        })
        store.next(nextState)
    }
}

const driverService = new DriverService()
export default driverService