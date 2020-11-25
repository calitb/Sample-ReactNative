import { Character } from './redux/reducer';

export async function fetchCharacters(): Promise<Character[] | undefined> {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const body = await response.json();
    const { results, info } = body;
    const characters = results.map(characterMapper);

    return characters;
  } catch (ex) {
    return undefined;
  }
}

function characterMapper({ id, name, image }: Character): Character {
  return {
    id,
    name,
    image,
  };
}
