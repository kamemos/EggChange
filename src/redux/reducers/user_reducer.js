import * as types from '../types';
import { cookies } from '../../helpers';

const initialState = {
    'email': cookies.getCookie("email"),
    'jwt_token': cookies.getCookie("token")
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.EMAIL_ACTION:
            cookies.setCookie("email", action.payload)
            return {
                ...state,
                'email': action.payload
            }
        case types.JWT_ACTION:
            cookies.setCookie("token", action.payload)
            return {
                ...state,
                'jwt_token': action.payload
            }
        default:
            return {
                ...state
            }
    }
}