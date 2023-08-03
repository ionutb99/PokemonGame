/**
 * 
 * @param {Number} playerHp Hit points of the player
 * @param {Number} encounterPokemonHp Hit points of the enemy
 * @param {*} setWinner Winner state setter
 */
export const checkWinner = (playerHp, encounterPokemonHp, setWinner) => {
    if(parseInt(playerHp) < 1){
        setWinner(`Ai`);
        
    }
    if (parseInt(encounterPokemonHp) < 1) {
        setWinner(`Player`);
    }
    
}