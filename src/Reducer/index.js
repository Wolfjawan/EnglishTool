import { combineReducers } from 'redux';
// import AuthReducer from './AuthReducer';
import DatabaseReducer from './DatabaseReducer'
export default combineReducers({
  // auth: AuthReducer,
  Database: DatabaseReducer
});
