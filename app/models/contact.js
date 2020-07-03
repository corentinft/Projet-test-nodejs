const DatabaseConnexion = require("../database/DatabaseConnexion")
const databaseConnexion = new DatabaseConnexion()

module.exports = class Contact {

    async sendContact(form) {

        // TODO
        const client = databaseConnexion.connexion()

        await client.query('INSERT INTO public.user (email,password) VALUES ($1::text, $2::text)', [email, password])
            .catch(err => {return false})

        databaseConnexion.disconnection(client)

        return true
    }
}