import axiosApi from "../../axiosApi";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const fetchAlbumsSuccess = album => ({type: FETCH_ALBUMS_SUCCESS, album});
export const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, error});

export const getArtistAlbum = id => {
  return async dispatch => {
      try {
          const response = await axiosApi.get('/albums?artist=' + id);
          dispatch(fetchAlbumsSuccess(response.data))
      } catch (error) {
          dispatch(fetchAlbumsFailure(error))
      }
  }
};