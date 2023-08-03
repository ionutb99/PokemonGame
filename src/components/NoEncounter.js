import React from 'react'

/**
 * 
 * @param {*} props 
 * @returns Returns html structure in case we haven't encountered any pokemons in the visited area
 */
export default function NoEncounter(props) {
  return (
    <div className="app">
        <h2>This location doesn't seem to have any pokémon</h2>
        <button onClick={(e) => {props.setEncounterLocation(null)}}>Back</button>
    </div>
  )
}
