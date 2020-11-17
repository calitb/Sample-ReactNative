import Action from './actions';
import { State } from './store';

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return { ...state, contador: state.contador + 1 };
  }
}
