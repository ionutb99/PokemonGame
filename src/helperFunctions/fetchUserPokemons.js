/**
 * 
 * @param {Array} usersPokemon Array of pokemons avaible to the user at the moment (hard coded)
 * @param {Array} userPokemon Same as above, except it's a state and will change to the selected pokemon
 */
export const fetchUserPokemons = async (usersPokemon, userPokemon, setFetching) => {
    usersPokemon.forEach(async (pokemon) => {
        const res = await fetch(pokemon);
        const data = await res.json();
        userPokemon.push(data);
    });

    setFetching(false)
}