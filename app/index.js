const ConnexionController = require("../app/controllers/ConnexionController")
const express = require('express')
const Users = require('../app/models/users')

const app = express()
const connexionController = new ConnexionController(new Users())

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/login', connexionController.login.bind(connexionController))

app.get('/register', connexionController.register.bind(connexionController))

app.get('/forgetPw', connexionController.ForgetPw.bind(connexionController))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
