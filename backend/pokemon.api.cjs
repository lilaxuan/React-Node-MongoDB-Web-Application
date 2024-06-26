const express = require('express');
const router = express.Router();
const PokemonModel = require('./db/pokemon.model.cjs')

let pokemonColors = [
    {name: "pikachu", color: "yellow"},
    {name: "charizard", color: "red"},
];

// /api/pokemon/
router.post('/', async function(req, res) {
    const requestBody = req.body;

    if(!requestBody.name || !requestBody.color) {
        res.status(401);
        return res.send("Please insert valid Pokemon Name and Color!")
    }

    const newPokemon = {
        name: requestBody.name,
        color: requestBody.color,
        owner: "jiaxuan",
    }

    // console.log(newPokemon);

    try {
        const response = await PokemonModel.insertPokemon(newPokemon);
        res.cookie('pokemonOwner', 'jiaxuan'); // set up the request cookie owner; only can be updated when post api is called!!! just updating the server.js doesn;t work
        res.cookie('favoriteColor', 'yellow');
        return res.send(response);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

})


// /api/pokemon/pikachu
// --> pkId => pikachu
router.put('/:pkId', async function(req, res) {
    const pokemonId = req.params.pkId;
    const pokemonData = req.body;
    // const trainer = req.params.trainer;

    if (!pokemonData.name || !pokemonData.color) {
        res.status(400);
        return res.send("You need to include the pokemon name and color in your request");
    }

    try {
        const pokemonUpdateResponse = await PokemonModel.updatePokemon(pokemonId, pokemonData);
        return res.send('Successfully updated pokemon ID ' + pokemonId)
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
    // for(let i = 0; i < pokemonColors.length; i++) {
    //     const pokemonRow = pokemonColors[i];
    //     if(pokemonRow.name === pokemonName) {
    //         pokemonRow.name = pokemonData.name;
    //         pokemonRow.color = pokemonData.color;
    //         return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
    //     }
    // }

    // res.status(404);
    // return res.send("Pokemon with name " + pokemonName + " not found :(");
})



// -> /pokemon/pikachu => req.params.pokemonName === pikachu
// -> /pokemon/pikachu?food=banana
router.get('/:pkId', async function(req, res) {
    const pokemonId = req.params.pkId;
    // const trainer = req.params.trainer;


    try {
        const getPokemonResponse = await PokemonModel.getPokemonById(pokemonId);
        return res.send(getPokemonResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

    // res.status(404);
    // return res.send("Pokemon with name " + pokemonName + " not found :(");
})

router.delete('/:pokemonId', async function(req, res) {
    const pokemonId = req.params.pokemonId;

    try {
        const deletePokemonResponse = await PokemonModel.deletePokemon(pokemonId);
        return res.send(deletePokemonResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
    // pokemonColors = pokemonColors.filter(function(pokemon) {
    //     return pokemon.name !== pokemonName
    // });

    // return res.send("Success :)");
})

// router.get('/', async function (req, res) {
//     const name = req.query.name; // Access query parameter for filtering by name
//     const owner = req.cookies.pokemonOwner; // Assuming you still want to use owner from cookies for some logic
//     console.log('owner is: ', owner);
//     try {
//         if (name) {
//             // Assuming you have a method in your PokemonModel to find a Pokemon by name
//             // This is just a hypothetical method name; adjust according to your actual model
//             const pokemonByName = await PokemonModel.findByName(name);
//             return res.send(pokemonByName);
//         } else {
//             // If no name query is provided, retrieve all Pokemon
//             // const allPokemon = await PokemonModel.getAllPokemon(); // Your existing method for fetching all Pokemon
//             const allPokemon = await PokemonModel.getPokemonByOwner(owner);
//             return res.send(allPokemon);
//         }
//     } catch (error) {
//         res.status(400).send("Error retrieving Pokemon from the database.");
//     }
// });


// localhost:8000/api/pokemon?name=pikachu
router.get('/', async function(req, res) {
    const owner = req.cookies.pokemonOwner;
    console.log('owner is: ', owner);

    // for(let i = 0; i < pokemonColors.length; i++) {
    //     const pokemonRow = pokemonColors[i];
    //     if(pokemonRow.name === pokemonName) {
    //         return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
    //     }
    // }

    try {
        const allPokemonResponse = await PokemonModel.getPokemonByOwner(owner);
        return res.send(allPokemonResponse);
    } catch (error) {
        res.status(400);
        return res.send("Error inserting Pokemon into DB :/");
    }

})


module.exports = router;