module.exports = class ConnexionController {

    constructor(db) {
        this._db = db
    }

    /*
     * URL /login/?email=DATA&password=DATA
     */
    login(req, res) {
        if(req.query.password === '') {
            return res.send({result: 'Error-Password-Null', token: ''})
        }

        if(req.query.email === '') {
            return res.send({result: 'Error-Email-Null', token: ''})
        }

        const data = this._db.get(req.query.email)

        if(data === undefined) {
            return res.send({result: 'Error-Undefined-Email', token: ''})
        }

        if(req.query.password !== data ) {
            return res.send({result: 'Error-Wrong-Password', token: ''})
        }
        else {
            return res.send({result: 'Ok',token: 'Connected'})
        }

    }

    /*
     * URL /register/?email=DATA&password=DATA
     */
    register(req, res) {
        if(req.query.password === '') {
            return res.send({result: 'Error-Password-Null'})
        }

        if(req.query.email === '') {
            return res.send({result: 'Error-Email-Null'})
        }

        if(req.query.password.length < 5) {
            return res.send({result: 'Error-Length-Password'})
        }

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.query.email)) {
        }
        else {
            return res.send({result: 'Error-Not-Email'})
        }

        if(!this._db.add(req.query.email, req.query.password)) {
            return res.send({result: 'no'})
        }

        res.send({result: 'Ok'})

    }

    /*
     * URL /ForgetPw/?email=DATA&oldPassword=DATA&newPassword=DATA
     */
    ForgetPw(req, res) {
        if(req.query.newPassword === '') {
            return res.send({result: 'Error-NewPassword-Null'})
        }

        if(req.query.oldPassword === '') {
            return res.send({result: 'Error-OldPassword-Null'})
        }

        if(req.query.email === '') {
            return res.send({result: 'Error-Email-Null'})
        }

        if(req.query.newPassword.length < 5) {
            return res.send({result: 'Error-Length-Password'})
        }

        const data = this._db.get(req.query.email)

        if(data === undefined) {
            return res.send({result: 'Error-Undefined-Email'})
        }

        if(req.query.oldPassword !== data ) {
            return res.send({result: 'Error-Wrong-Password'})
        }
        else {
            this._db.put(req.query.email, req.query.newPassword)
            return res.send({result: 'Ok'})
        }

    }
}