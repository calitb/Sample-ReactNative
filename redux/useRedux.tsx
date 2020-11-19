import initialState, { State } from './store';
import { useContext, useReducer } from 'react';

import Action from './actions';
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

export function ReduxProvider(props: ReduxProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default function useRedux() {
  return useContext(MyContext);
}