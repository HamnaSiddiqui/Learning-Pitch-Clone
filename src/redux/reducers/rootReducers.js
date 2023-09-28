import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
const comibineReducer = combineReducers({
  appReducer: appReducer,
});
export default comibineReducer;