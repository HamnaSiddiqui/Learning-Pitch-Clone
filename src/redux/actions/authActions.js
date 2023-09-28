import * as types from '../types';
import axios from 'axios';

export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    try {
      console.log('loginUser action');
      const requestData = {
        email: email,
        password: password,
        deviceId: '122333',
      };
      const headers = {
        'Content-Type': 'application/json',
        signature: 'abcdefghijklmnopQRSTUVWXYz!@#$%&*()0987654321',
      };

      const response = await axios?.post(
        'https://learningpitch.com/api/login',
        requestData,
        {headers},
      );

      if (response?.data?.error === '0') {
        dispatch({type: types.LOGIN_SUCCESS, payload: response?.data?.token});
        return new Promise.resolve(response?.data);
      } else {
        return new Promise.reject(response?.data?.errors[0]?.email);
      }
    } catch (e) {
      console.log('Login Error :', e.message);
    }
  };
};


export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({type: types.LOGOUT});

      console.log('LOGOUTINGGG');
    } catch (error) {
      console.log('Error in logging out: ', error);
    }
  };
};
