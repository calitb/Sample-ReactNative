import initialState, { State } from './store';
import { useContext, useReducer } from 'react';

import Action from './actions';
import React from "react"
import { createContext } from 'react';
import reducer from './reducer';

interface MyContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const MyContext = createContext<MyContextProps>({
  state: initialState,
  dispatch: () => { },
});

interface ReduxProvider {
  children: React.ReactNode
}

export type Thunk = (dispatch: React.Dispatch<Action>) => void;

export function ReduxProvider(props: ReduxProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const miNuevoDispatch = (action: Action | Thunk) => {
    if (typeof action === 'function') {
      action(dispatch)
    }
    else {
      dispatch(action);
    }
  }

  return (
    <MyContext.Provider value={{ state, dispatch: miNuevoDispatch }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default function useRedux() {
  return useContext(MyContext);
}