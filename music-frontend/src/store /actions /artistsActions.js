import axiosApi from "../../axiosApi";

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
