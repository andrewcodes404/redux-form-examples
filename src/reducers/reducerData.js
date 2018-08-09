import { FETCH_DATA } from '../actions/actionConstants'

//set state to {object} to begin with
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload
        default:
            return state;
    }
}

