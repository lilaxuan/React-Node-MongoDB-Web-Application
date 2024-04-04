const express = require('express');
const pokemon = require('./backend/pokemon.api.cjs');
const users = require('./backend/user.api.cjs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemon', pokemon);
app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send("This is the FIRST GET request")
});

app.get('/', function(request, response) {
    response.send("This is SECOND GET request");
})

app.put('/', function(request, response) {
    response.send("This is a PUT request")
})

app.listen(8000, function() {
    console.log("Starting app now...")
})