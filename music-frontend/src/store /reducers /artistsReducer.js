import {FETCH_ARTISTS_SUCCESS} from "../actions /artistsActions";

const initialState = {
    artists: []
};
const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {...state, artists: action.artist};
        default:
            return state
    }
};

export default artistsReducer