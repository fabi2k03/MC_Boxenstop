
import produce from "immer";
import store from "./model/store"
import { Driver } from "./model/driver";
const url = "https://www.jsonkeeper.com/b/D2GL"

class UserService {
    async fetchUsers() {
        const response = await fetch(url)
        let drivers: [Driver] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.drivers = drivers
        })
        store.next(nextState)
    }
}

const userService = new UserService()
export default userService