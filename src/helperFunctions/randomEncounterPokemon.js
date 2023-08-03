/**
 * 
 * @param {Object} ecnounterLocation Object of the location selected by the user
 * @returns A random pokemon from the possible pokemons to encounter in the zone
 */
export const getRandomPokemon = (ecnounterLocation) => {
  return ecnounterLocation.pokemon_encounters[
    Math.floor(Math.random() * ecnounterLocation.pokemon_encounters.length)
  ].pokemon;
};

