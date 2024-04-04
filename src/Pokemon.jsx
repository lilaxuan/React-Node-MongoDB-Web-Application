import axios from 'axios'
import { useEffect, useState } from 'react'

function PokemonPage() {
  const [pokemonListState, setPokemonListState] = useState([]);
  const [pokemonNameState, setPokemonNameState] = useState('');
  const [pokemonColorState, setPokemonColorState] = useState('');
  const [errorMsgState, setErrorMsgState] = useState('');

  async function getAllPokemon() {
    const response = await axios.get('/api/pokemon');
    setPokemonListState(response.data);
  }

  async function deletePokemon(pokemonName) {
    await axios.delete('/api/pokemon/' + pokemonName);
    await getAllPokemon();
  }

  async function insertPokemon() {
    setErrorMsgState('')
    try {
        await axios.post('/api/pokemon', {
            name: pokemonNameState,
            color: pokemonColorState,
        })
        setPokemonColorState('');
        setPokemonNameState('');
        await getAllPokemon();    
    } catch (error) {
        setErrorMsgState(error.response.data)
    }
  }

  function updatePokemonColor(event) {
    setPokemonColorState(event.target.value);
  }

  function updatePokemonName(event) {
    setPokemonNameState(event.target.value);
  }

  useEffect(function() {
    getAllPokemon();
  }, [])

  const pokemonListElement = [];
  for(let i = 0; i < pokemonListState.length; i++) {
    pokemonListElement.push(<li>Name: {pokemonListState[i].name} 
        - Color: {pokemonListState[i].color} 
        - <button onClick={() => deletePokemon(pokemonListState[i].name)}>Delete</button>
    </li>)
  }



  return (
    <div>
        {errorMsgState && <h1>
            {errorMsgState}
        </h1>}
        Here are all your pokemon!!
        <ul>
            {pokemonListElement}
        </ul>

        <div>Add new pokemon</div>
        <div>
            <div>
                <label>Name:</label> <input value={pokemonNameState} onInput={(event) => updatePokemonName(event)}/>
            </div>
            <div>
                <label>Color:</label> <input value={pokemonColorState} onInput={(event) => updatePokemonColor(event)}/>
            </div>
            <div>
                <button onClick={() => insertPokemon()}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default PokemonPage;
