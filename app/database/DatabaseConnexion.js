const { Client } = require('pg')
require('dotenv').config()

module.exports = class DatabaseConnexion {

    connexion() {
        const connectionString = process.env.DATABASE_URL;

        const client = new Client({
            connectionString: connectionString
        })

        client
            .connect()
            .then(() => console.log('connected'))
            .catch(err => console.error('connection error', err.stack))

        return client
    }

    disconnection(client){
        client
            .end()
            .then(() => console.log('disconnected'))
            .catch(err => console.error('disconnection error', err.stack))
    }
}