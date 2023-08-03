import "./App.css";
import { useEffect, useState } from "react";
import Locations from "./components/Locations";
import Encounter from "./components/Encounter";
import { getRandomPokemon } from "./helperFunctions/randomEncounterPokemon";
import NoEncounter from "./components/NoEncounter";
import { usersPokemons} from "./userPokemons/userPokemons";

function App() {
  //State for all the locations we want to display to the user(20 out of 850)
  const [locations, setLocations] = useState(null);
  //Id of the location clicked by the user
  const [locationId, setLocationId] = useState(null);
  //State to hold the data fetched with the locationId
  const [encounterLocation, setEncounterLocation] = useState(null);

  //Fetch all the location we want to display to the user (20 out of 850)
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location?offset=20&limit=20`)
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  //Fetch the data of the location selected by the user(based on the locationId)
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location-area/${locationId}/`)
      .then((response) => response.json())
      .then((data) => setEncounterLocation(data));
  }, [locationId]);


  //Hard coded pokemons avaible to the user from the start


  if (encounterLocation) {
    //Get a random pokemon from the avaible list of pokemons we can encounter in the area
    const encounterPokemon = getRandomPokemon(encounterLocation);

    //Render logic if we have encountered a pokemon
    if (encounterPokemon) {
      return (
        <Encounter
          encounterPokemon={encounterPokemon}
          usersPokemon={usersPokemons}
          setEncounterLocation = {setEncounterLocation}
        />
      );
    }
    //If there are no pokemons to encounter
    return <NoEncounter setEncounterLocation={setEncounterLocation} />;
  }

  //Logic to render all the location avaible for the user to visit(20 out of 850)
  if (locations) {
    return (
      <div className="app">
        {locations.results.map((location, index) => (
          <Locations
            key={index}
            location={location.name}
            id={location.url.substring(
              location.url.length - 3,
              location.url.length - 1
            )}
            setLocationId={setLocationId}
          />
        ))}
      </div>
    );
  }
}

export default App;
