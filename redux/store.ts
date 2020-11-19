export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface State {
  characters: Character[];
  character?: Character;
}

const initialState: State = {
  characters: [],
  character: undefined,
};

export default initialState;
