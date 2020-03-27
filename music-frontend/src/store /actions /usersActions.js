import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';

export const fetchHistorySuccess = history => ({type: FETCH_HISTORY_SUCCESS, history});

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            dispatch(push('/'))
        }catch (error) {
            if (error.response) {
                dispatch(registerUserFailure(error.response.data))
            } else {
                dispatch(registerUserFailure({global: "Ошибка сети"}))
            }
        }
    }
};

export const loginUser = userData => {
    return async (dispatch) => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'))
        } catch (error) {
            if (error.response) {
                dispatch(loginUserFailure(error.response.data))
            } else {
                dispatch(loginUserFailure({global: "Ошибка сети"}))
            }
        }   
    }
};
export const getHistory = () => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.user;
            const response = await axiosApi.get('/track_history',{headers: {"Authorization": "Token " + user.token}});
            dispatch(fetchHistorySuccess(response.data))
        }catch (error) {
            console.log(error)
        }
    }
};
export const saveTrack = trackId => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.user;
            await axiosApi.post('/track_history', {track: trackId}, {headers: {"Authorization": "Token " + user.token}});
            dispatch(fetchHistorySuccess())
        } catch (error) {
            console.error(error)
        }

    }
};