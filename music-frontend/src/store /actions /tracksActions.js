import axiosApi from "../../axiosApi";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const fetchTracksSuccess = track => ({type: FETCH_TRACKS_SUCCESS, track});
export const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const getAlbumTracks = id => {
    return async dispatch => {
        try {
            const response = await axiosApi('/tracks?album=' + id);
            dispatch(fetchTracksSuccess(response.data))
        }catch (error) {
            dispatch(fetchTracksFailure(error))
        }
    }
};