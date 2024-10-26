import { useState, useEffect } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [pokemons, setPokemons] = useState([]); // State to hold the search results
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(''); // State for errors
  const [notFound, setNotFound] = useState(false); // State for "not found" message

  // Function to fetch Pokémon data based on the search term
  const fetchPokemon = async (term) => {
    setLoading(true);
    setError('');
    setNotFound(false);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true);
        } else {
          throw new Error('Error fetching data');
        }
        return;
      }
      const data = await response.json();
      const pokemonInfo = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
      };
      setPokemons([pokemonInfo]); // Set results to state
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch Pokémon when search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchPokemon(searchTerm);
    } else {
      setPokemons([]); // Clear results if search term is empty
      setNotFound(false); 
    }
  }, [searchTerm]);

  return (
    <>
      <h1>Pokémon Search</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {notFound && <p className="not-found">Pokémon not found</p>}
      <PokemonList pokemons={pokemons} />
    </>
  );
}

export default App;
