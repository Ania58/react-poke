import React from 'react';
import PokemonItem from './PokemonItem';

const PokemonList = ({ pokemons }) => {
  return (
    <ul>
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </ul>
  );
};

export default PokemonList;