import * as types from '../types';
import { cookies } from '../../helpers';

const initialState = {
    'email': cookies.getCookie("email"),
    'jwt_token': cookies.getCookie("token")
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.EMAIL_ACTION:
            cookies.setCookie("email", action.payload, 12)
            return {
                ...state,
                'email': action.payload
            }
        case types.JWT_ACTION:
            cookies.setCookie("token", action.payload, 12)
            return {
                ...state,
                'jwt_token': action.payload
            }
        case types.LOGOUT:
            cookies.deleteCookie("email");
            cookies.deleteCookie("token");
            return {
                ...state,
                'email': '',
                'jwt_token': ''
            }
        default:
            return {
                ...state
            }
    }
}