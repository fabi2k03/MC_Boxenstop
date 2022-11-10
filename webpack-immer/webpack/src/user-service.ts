
import produce from "immer";
import store from "./model/store"
import { User } from "./model/user";
const url = "https://jsonplaceholder.typicode.com/users"

class UserService {
    async fetchUsers() {
        const response = await fetch(url)
        let users: [User] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.users = users
        })
        store.next(nextState)
    }
}

const userService = new UserService()
export default userService