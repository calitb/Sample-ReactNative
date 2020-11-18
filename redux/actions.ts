import { Personaje } from './store';

interface SeleccionarPersonaje {
  type: 'SELECCIONAR_PERSONAJE';
  personaje: Personaje;
}

interface SetPersonajes {
  type: 'SET_PERSONAJES';
  personajes: Personaje[];
}

interface ObtenerPersonajes {
  type: 'OBTENER_PERSONAJES';
}

type Action = SeleccionarPersonaje | ObtenerPersonajes | SetPersonajes;

export default Action;
