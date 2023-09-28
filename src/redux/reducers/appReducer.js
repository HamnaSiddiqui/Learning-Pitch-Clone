import * as types from '../types';
import {initialState} from './initialStates';

export const appReducer = (state = initialState.appReducer, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action?.payload,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};