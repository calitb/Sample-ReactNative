import reducer from '../redux/reducer';
import store from '../redux/store';
import { useReducer } from 'react';

export default function useRedux() {
  return useReducer(reducer, store);
}
