const DatabaseConnexion = require("../database/DatabaseConnexion")
const databaseConnexion = new DatabaseConnexion()

module.exports = class Users {

    async add(email, password) {
        const client = databaseConnexion.connexion()
        await client.query('INSERT INTO public.user (email,password) VALUES ($1::text, $2::text)', [email, password])
            .catch(err => {return false})

        databaseConnexion.disconnection(client)

        return true
    }

    async get(email) {
        const client = databaseConnexion.connexion()
        const res = await client.query('SELECT * FROM public.user WHERE email=$1::text', [email])

        databaseConnexion.disconnection(client)

        return res.rows[0]
    }

    async put(email, password) {
        const client = databaseConnexion.connexion()
        await client.query('UPDATE public.user SET password=$1::text WHERE email=$2::text', [password,email])
            .catch(err => {return false})

        databaseConnexion.disconnection(client)

        return true
    }

}