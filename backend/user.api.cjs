
const express = require('express');
const router = express.Router();

const users = [
    {username: 'hunter', trainerId: 123},
    {username: 'alex', trainerId: 234}
]


// localhost:8000/users/?startOfUsername=h
router.get('/', function(request, response) {
    const startOfUsername = request.query.startOfUsername

    const foundUsers = []

    for(let i = 0; i < users.length; i++) {
        const user = users[i];
        if(startOfUsername !== undefined) {
            if(user.username.startsWith(startOfUsername)) {
                foundUsers.push(user);
            }
        } else {
            foundUsers.push(user);
        }
    }

    response.send(foundUsers)
});

// localhost:8000/users/123
// localhost:8000/users/123/pokemon/pikachu1
router.get('/:userId', function(request, response) {
    // params = {
    //  userId: 123,
    //  pokemonId: pikachu1    
    //}
    
    const userId = request.params.userId
    const pokemonId = request.params.pokemonId

    for(let i = 0; i < users.length; i++) {
        const user = users[i];
        if(user.trainerId === Number(userId)) {
            return response.send(user);
        }

    }

    response.status(404);
    response.send("No user found for trainerID " + userId);
});


router.post('/', function(request, response) {
    const body = request.body;

    const username = body.username;

    if(!username) {
        response.status(401);
        return response.send("Missing username")
    }

    const trainerId = Math.floor(Math.random() * 1000);

    users.push({
        username: username,
        trainerId: trainerId,
    })

    response.json("Successfully created user with trainer ID " + trainerId)
})

module.exports = router;