import { BehaviorSubject } from "rxjs"

import {Driver} from "./driver"

export interface Model {
    readonly drivers: Driver[]
}

const initialState: Model = {
    drivers: []
}

const store = new BehaviorSubject<Model>(initialState)

export default store;

