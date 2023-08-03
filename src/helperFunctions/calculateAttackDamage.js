/**
 * 
 * @param {Object} playerPokemon Data of the pokemon choosen by the player
 * @param {Object} encounterPokemon Data of the enemy pokemon
 * @param {String} turn Player/Ai based on whos turn it is to attack
 * @returns The calculated damage dealt to the enemey
 */
export const calculateAttackDamage = (
  playerPokemon,
  encounterPokemon,
  turn
) => {
  //((((2/5+2)*B*60/D)/50)+2)*Z/255
  const playerAttack = playerPokemon.stats[1].base_stat;
  const playerDefense = playerPokemon.stats[2].base_stat;

  const encounterPokemonAttack = encounterPokemon.stats[1].base_stat;
  const encounterPokemonDefense = encounterPokemon.stats[2].base_stat;

  const randomNumber = Math.random() * (255 - 217) + 217;

  switch (turn) {
    case `Player`:
      return Math.floor(
        ((((2 / 5 + 2) * playerAttack * 60) / encounterPokemonDefense / 50 +
          2) *
          randomNumber) /
          255
      );
    case `Ai`:
      return Math.floor(
        ((((2 / 5 + 2) * encounterPokemonAttack * 60) / playerDefense / 50 +
          2) *
          randomNumber) /
          255
      );
    default:
      break;
  }
};
