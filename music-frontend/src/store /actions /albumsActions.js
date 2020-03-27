import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const fetchAlbumsSuccess = album => ({type: FETCH_ALBUMS_SUCCESS, album});
export const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, error});

export const getArtistAlbum = id => {
  return async dispatch => {
      try {
          let response;
          if (id) {
              response = await axiosApi.get('/albums?artist=' + id);
          } else {
              response = await axiosApi.get('/albums');
          }
          dispatch(fetchAlbumsSuccess(response.data))
      } catch (error) {
          dispatch(fetchAlbumsFailure(error))
      }
  }
};

export const getAlbumById = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/albums/' + id);
            dispatch(fetchAlbumsSuccess(response.data))
        }catch (error) {
            dispatch(fetchAlbumsFailure(error))
        }
    }
};

export const newAlbum = albumData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/albums', albumData, {headers})
            dispatch(push('/'))
        } catch (error) {
            dispatch(fetchAlbumsFailure(error))
        }
    }
};

export const albumPublish = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post(`/albums/${id}/published`, null, {headers})
        }catch (error) {
            console.log(error)
        }
    }
};
export const deleteAlbum = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.delete('/albums/' + id, {headers})
        } catch (error) {
            console.log(error)
        }
    }
};
