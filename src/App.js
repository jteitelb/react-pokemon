import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDescription } from "./api/utils";
import "./styles/styles.css";
import Select from "./components/Select";

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getPokemonList();
      setPokemonData(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const descriptionList = [];
      for (let i = 1; i <= 150; i++) {
        const description = await getPokemonDescription(i);
        descriptionList.push(description);
      }
      setDescriptions(descriptionList);
      console.log(descriptionList);
    })();
  }, []);

  const pokemonName = pokemonData ? pokemonData[pokemonId - 1]?.name : null;
  const selectOptions = pokemonData
    ? pokemonData.map((pokemon, index) => {
        return (
          <option key={pokemon.name} value={index + 1}>
            {pokemon.name}
          </option>
        );
      })
    : null;

  const handleSelect = (e) => {
    try {
      const newId = parseInt(e.target.value);
      setPokemonId(newId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Select
        onChange={(e) => {
          handleSelect(e);
        }}
        value={pokemonId}
      >
        {selectOptions}
      </Select>
      <div className="pokemon-card">
        <div className="img-circle">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          />
        </div>
        <div>{pokemonName || "Pokemon Name"}</div>
        <p>{descriptions?.[pokemonId - 1] || "Loading Descriptions..."}</p>
      </div>
      <div className="button-container">
        <button
          className={pokemonId == 1 ? "button-deactivated" : ""}
          onClick={() => {
            setPokemonId((curr) => (curr == 1 ? 1 : curr - 1));
          }}
        >
          Previous
        </button>
        <button
          className={pokemonId == 150 ? "button-deactivated" : ""}
          onClick={() => {
            setPokemonId((curr) => (curr == 150 ? 150 : curr + 1));
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
