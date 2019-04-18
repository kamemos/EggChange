import * as types from '../types';

export function setEmail(email){
    return (dispatch) => {
        return dispatch({
                type: types.EMAIL_ACTION,
                payload: email
        })
    }
}

export function setJWT(token){
    return (dispatch) => {
        return dispatch({
            type: types.JWT_ACTION,
            payload: token
        })
    }
}