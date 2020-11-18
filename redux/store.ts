export interface Personaje {
  id: string;
  name: string;
  image: string;
}

export interface State {
  personajes: Personaje[];
  personaje?: Personaje;
}

const store: State = {
  personajes: [],
  personaje: undefined,
};

export default store;
