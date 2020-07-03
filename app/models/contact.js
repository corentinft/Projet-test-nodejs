const DatabaseConnexion = require("../database/DatabaseConnexion")
const databaseConnexion = new DatabaseConnexion()

module.exports = class Contact {

    async sendContact(form) {
        const client = databaseConnexion.connexion()

        await client.query('INSERT INTO contact(email, name, surname, message) VALUES ($1::text, $2::text, $3::text, $4::text)', [form.email, form.name, form.surname, form.message])
            .catch(err => {return false})

        databaseConnexion.disconnection(client)

        return true
    }
}