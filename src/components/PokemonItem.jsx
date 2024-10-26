import React from 'react';

const PokemonItem = ({ pokemon }) => {
  return (
    <li key={pokemon.id}>
      <p>Name: {pokemon.name}</p>
      <p>ID: {pokemon.id}</p>
      {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
    </li>
  );
};

export default PokemonItem;