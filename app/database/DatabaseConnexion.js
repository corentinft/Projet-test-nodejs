const { Client } = require('pg')

module.exports = class DatabaseConnexion {

    connexion() {
        const connectionString = "postgresql://corentin:postgres@localhost:5432/unittest";

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