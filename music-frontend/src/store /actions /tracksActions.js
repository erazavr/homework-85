import axiosApi from "../../axiosApi";
import {push} from "connected-react-router"

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const fetchTracksSuccess = track => ({type: FETCH_TRACKS_SUCCESS, track});
export const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const getAlbumTracks = id => {
    return async dispatch => {
        try {
            let response;
            if(id) {
                response = await axiosApi('/tracks?album=' + id);
            } else {
                response = await axiosApi('/tracks')
            }
            dispatch(fetchTracksSuccess(response.data))
        }catch (error) {
            dispatch(fetchTracksFailure(error))
        }
    }
};

export const newTrack = trackData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/tracks', trackData, {headers});
            dispatch(push('/'))
        } catch (error) {
            dispatch(fetchTracksFailure(error))
        }
    }
};

export const trackPublish = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post(`/tracks/${id}/published`, null, {headers})
        }catch (error) {
            console.log(error)
        }
    }
};
export const deleteTrack = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.delete('/tracks/' + id, {headers})
        } catch (error) {
            console.log(error)
        }
    }
};