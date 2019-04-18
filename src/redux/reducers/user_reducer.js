import * as types from '../types';

const initialState = {
    'email': '',
    'jwt_token': ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.EMAIL_ACTION:
            return {
                ...state,
                'email': action.payload
            }
        case types.JWT_ACTION:
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