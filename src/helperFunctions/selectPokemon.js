/**
 * 
 * @param {Event} e event
 * @param {Array} pokemonList List of pokemons avaible to the user
 * @param {Function} setUserPokemon Setter function for the userPokemon state
 */
export const selectPokemon = (e, pokemonList, setUserPokemon) => {

  const selectedPokemon = pokemonList.filter(
    (pokemon) => pokemon.id === parseInt(e.target.dataset.pokemonid)
  );

  setUserPokemon(selectedPokemon);
};
