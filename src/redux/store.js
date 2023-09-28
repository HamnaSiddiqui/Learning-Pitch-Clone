import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import {createStore, applyMiddleware} from 'redux';
  import thunk from 'redux-thunk';
  import comibineReducer from './reducers/rootReducers';
  import {configureStore} from '@reduxjs/toolkit';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  export const persistConfig = {
    key: 'rn-task-storage-root',
    storage: AsyncStorage,
    debug: __DEV__,
  };
  
  const persistedReducer = persistReducer(persistConfig, comibineReducer);
  
  export const store = createStore(persistedReducer, applyMiddleware(thunk));
  
  export const persistor = persistStore(store);
  