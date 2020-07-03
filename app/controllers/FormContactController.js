module.exports = class FormContactController {

    constructor(db) {
        this._db = db
    }

    /*
     * URL /sendForm/?email=DATA
     */
    sendForm(req, res) {
        if (req.query.email === '') {
            return res.send({result: "Error-Email-Null"})
        }

        if (req.query.name === '') {
            return res.send({result: "Error-Name-Null"})
        }

        if (req.query.surname === '') {
            return res.send({result: "Error-Surname-Null"})
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.query.email))) {
            return res.send({result: 'Error-Not-Email'})
        }

        if (req.query.name === req.query.surname) {
            return res.send({result: "Error-Same-Name-Surname"})
        }

        if (req.query.message.length < 10) {
            return res.send({result: "Error-Length-Message"})
        }

        const form = {
            email: req.query.email,
            name: req.query.name,
            surname: req.query.surname,
            message: req.query.message
        }

        let add = this._db.sendContact(form)

        if (add) {
            return res.send({result: "Ok"})
        }
    }
}