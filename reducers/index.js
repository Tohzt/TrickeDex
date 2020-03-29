import comboListReducer from './comboList';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	comboList: comboListReducer
});

export default allReducers;
