import { combineReducers } from 'redux';
import test_reducer from './test_reducer';
import user_reducer from './user_reducer';

const rootReducer = combineReducers({
    test: test_reducer,
    user: user_reducer
});

export default rootReducer;