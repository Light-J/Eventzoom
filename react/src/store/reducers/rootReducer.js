import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import userReducer from './userReducer';

export default combineReducers({
	simpleReducer,
	userReducer,
});
