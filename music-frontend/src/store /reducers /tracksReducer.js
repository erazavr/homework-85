import {FETCH_TRACKS_SUCCESS} from "../actions /tracksActions";

const initialState = {
    tracks: []
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.track};
        default:
            return state
    }
};

export default tracksReducer