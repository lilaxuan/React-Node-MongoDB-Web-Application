const express = require('express');
const router = express.Router();

let pokemonColors = [
    {name: "pikachu", color: "yellow"},
    {name: "charizard", color: "red"},
    // snorlax, blue
];

// /pokemon/
router.post('/', function(req, res) {
    const requestBody = req.body;

    if(!requestBody.name || !requestBody.color) {
        res.status(401);
        return res.send("Please insert valid Pokemon Name and Color!")
    }

    const newPokemon = {
        name: requestBody.name,
        color: requestBody.color,
    }

    pokemonColors.push(newPokemon);

    res.send("Pokemon " + requestBody.name + " successfully added!")
})

// -> /pokemon/pikachu => req.params.pokemonName === pikachu
// -> /pokemon/pikachu?food=banana
router.get('/:pkId', function(req, res) {
    const pokemonName = req.params.pkId;
    // const trainer = req.params.trainer;

    for(let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if(pokemonRow.name === pokemonName) {
            return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
        }
    }

    res.status(404);
    return res.send("Pokemon with name " + pokemonName + " not found :(");
})

router.delete('/:pokemonId', function(req, res) {
    const pokemonName = req.params.pokemonId;
    
    pokemonColors = pokemonColors.filter(function(pokemon) {
        return pokemon.name !== pokemonName
    });

    return res.send("Success :)");
})

// localhost:8000/api/pokemon?name=pikachu
router.get('/', function(req, res) {
    const pokemonName = req.query.name

    // for(let i = 0; i < pokemonColors.length; i++) {
    //     const pokemonRow = pokemonColors[i];
    //     if(pokemonRow.name === pokemonName) {
    //         return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
    //     }
    // }

    return res.send(pokemonColors);
})

router.post('/', function(req, res) {
    res.send("Hello, I'm pikachu in the POST request");
})

module.exports = router;