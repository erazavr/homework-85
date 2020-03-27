import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const fetchArtistsSuccess = artist => ({type: FETCH_ARTISTS_SUCCESS, artist});
export const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/artists');
            dispatch(fetchArtistsSuccess(response.data))
        }catch (e) {
            dispatch(fetchArtistsFailure(e))
        }
    }
};
export const getArtist = id => {
  return async dispatch => {
      try {
          const response = await axiosApi.get('/artists?id=' + id);
          dispatch(fetchArtistsSuccess(response.data))
      }catch (error) {
          dispatch(fetchArtistsFailure(error))
      }

  }
};

export const newArtist = artistData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/artists', artistData, {headers});
            dispatch(fetchArtistsSuccess());
            dispatch(push('/'))
        } catch (error) {
            dispatch(fetchArtistsFailure(error))
        }
    }
};

export const artistPublish = id => {
  return async (dispatch, getState) => {
      try {
          const token = getState().users.user.token;
          const headers = {"Authorization": "Token " + token};
          await axiosApi.post(`/artists/${id}/published`, null, {headers})
      }catch (error) {
          console.log(error)
      }
  }
};
export const deleteArtist = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.delete('/artists/' + id, {headers})
        } catch (error) {
            console.log(error)
        }
    }
};
