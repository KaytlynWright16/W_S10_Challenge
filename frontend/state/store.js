import { configureStore } from '@reduxjs/toolkit'
import {pizzaApi} from './api';
import filterReducer from './filterSlice';

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    [pizzaApi.reducerPath]: pizzaApi.reducer, 
    filter: filterReducer,
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
