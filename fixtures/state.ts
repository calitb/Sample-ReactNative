import { State } from '../redux/reducer';
import { characterRick } from './character';

export const stateFixture: State = {
  characters: [characterRick],
  character: undefined,
  loading: false,
  pagination: { count: 10, page: 1, pages: 10, next: 2, prev: undefined },
};
