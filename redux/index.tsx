import { useDispatch as redux_useDispatch, useSelector as redux_useSelector } from 'react-redux'

import Actions from "./actions"
import { Dispatch } from "redux"
import { State } from "./reducer"

export function useDispatch(): Dispatch<Actions> {
  return redux_useDispatch<Dispatch<Actions>>();
}

export function useSelector<T>(selector: (state: State) => T): T {
  return redux_useSelector<State, T>(selector);
}
