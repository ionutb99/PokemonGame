import React, { useEffect, useState } from "react";
import { calculateAttackDamage } from "../helperFunctions/calculateAttackDamage";
import { checkWinner } from "../helperFunctions/checkWinner";
import { fetchUserPokemons } from "../helperFunctions/fetchUserPokemons";
import { selectPokemon } from "../helperFunctions/selectPokemon";
import { usersPokemons } from "../userPokemons/userPokemons";

/**
 *
 * @param {*} props
 * @returns Html structure of the encounter event
 */
export default function Encounter(props) {
  //State for the encountered pokemons data
  const [encounterPokemonData, setEncounterPokemonData] = useState(null);
  //State to fetch the data for all the pokemons the user has
  const [fetching, setFetching] = useState(true);
  //State for the data of the pokemon selected by the user, initially holds all the pokemons avaible to the user
  const [userPokemon, setUserPokemon] = useState([]);
  //State holding the enemys HP
  const [encounterPokemonHP, setEncounterPokemonHP] = useState(null);
  //State holding the players HP
  const [playerHP, setPlayerHp] = useState(null);
  //State to check if there's a winner
  const [winner, setWinner] = useState(null);
  //State to check if they are fighting
  const [showCircles, setShowCircles] = useState(false);



  //Fetch the data of the encountered pokemon
  const encounterPokemon = props.encounterPokemon;
  useEffect(() => {
    fetch(encounterPokemon.url)
      .then((res) => res.json())
      .then((data) => setEncounterPokemonData(data));
  }, [encounterPokemon]);

  //Fetch the data of all the pokemons the user has
  if (fetching) {
    fetchUserPokemons(props.usersPokemon, userPokemon, setFetching);
  }

  //encounterPokemonData => holds all the data of the encountered pokemon
  //userPokemon => holds all the data of the pokemon selected by the user

  //Logic to check if theres a winner. If player wins => add the pokemons to the users pokemon list. If the enemy wins, return to the locations screen
  if (winner) {
    switch (winner) {
      case `Player`:
        if (
          usersPokemons.indexOf(
            `https://pokeapi.co/api/v2/pokemon/${encounterPokemon.name}`
          ) === -1
        ) {
          usersPokemons.push(
            `https://pokeapi.co/api/v2/pokemon/${encounterPokemon.name}`
          );
        }
        
        setTimeout(() => {
          props.setEncounterLocation(null);
        }, 2000);

        return (<div className="winnerDiv"> <h2 className="secondH2"><b className="colorId">{winner}</b> <i>Wins!</i></h2></div>);
      case `Ai`:
        setTimeout(() => {
          props.setEncounterLocation(null);
          setWinner(null);
        }, 2000);
        
        return (<div className="winnerDiv"> <h2 className="secondH2"><b className="colorId">{winner}</b> <i>Wins!</i></h2> </div>);
      default:
        break;
    }
  }

  //Render logic
  if (encounterPokemonData && !fetching) {
    if (encounterPokemonHP === null) {
      setEncounterPokemonHP(encounterPokemonData.stats[0].base_stat);
    }

    return (
      <div className="app">
        <div className="encounterPokemon">
          <h2 id="id">{encounterPokemon.name}</h2>
          <div className={showCircles ? 'circle' : ''}></div>
          <div className={showCircles ? 'circle-two' : ''}></div>
          <img src={encounterPokemonData.sprites.front_default} alt="" />
          <div className="healthBar">
          <div
            className="healthBarFill"
            style={{
              width: `${(encounterPokemonHP / encounterPokemonData.stats[0].base_stat) * 100}%`
            }}
          ></div>
        </div>
        <h2 id="encounterPok">HP: {encounterPokemonHP < 1 ? 0 : encounterPokemonHP}</h2>

        </div>
        <div className="usersPokemons">
        <div className={showCircles ? 'circle-three' : ''}></div>
        <div className={showCircles ? 'circle-four' : ''}></div>
          {userPokemon.length > 1
            ? userPokemon.map((pokemon, index) => {
                return (
                  <img
                    key={index}
                    alt={``}
                    src={pokemon.sprites.front_default}
                    data-pokemonid={pokemon.id}
                    onClick={(e) => {
                      selectPokemon(e, userPokemon, setUserPokemon);
                    }}
                  ></img>
                );
              })
            : userPokemon.map((pokemon, index) => {
                if (playerHP === null) {
                  setPlayerHp(pokemon.stats[0].base_stat);
                }
                console.log(pokemon.stats);

                return (
                  <>
                    <img
                      key={index}
                      alt={``}
                      src={pokemon.sprites.front_default}
                      data-pokemonid={pokemon.id}
                      onClick={(e) => {
                        selectPokemon(e, userPokemon, setUserPokemon);
                      }}
                    ></img>
                    <button
                      id="attackButton"
                      onClick={(e) => {
                        setEncounterPokemonHP(
                          encounterPokemonHP -
                            calculateAttackDamage(
                              pokemon,
                              encounterPokemonData,
                              `Player`
                            )
                        );
                        setPlayerHp(
                          playerHP -
                            calculateAttackDamage(
                              pokemon,
                              encounterPokemonData,
                              `Ai`
                            )
                        );
                        checkWinner(playerHP, encounterPokemonHP, setWinner);
                        setShowCircles(true);
                        setTimeout(() => {
                          setShowCircles(false);
                        }, 1000);

                      
                      }}
                    >
                      Attack!
                    </button>
                    <div className="healthBar">
                      <div
                        className="healthBarFill"
                        style={{
                          width: `${(playerHP / userPokemon[0].stats[0].base_stat) * 100}%`
                        }}
                      ></div>
                      <h2 id="userHP">HP: {playerHP < 1 ? 0 : playerHP}</h2>
                    </div>
                  </>
                );
              })}
        </div>
      </div>
    );
  }
}
