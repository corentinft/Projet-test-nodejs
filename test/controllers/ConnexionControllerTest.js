const assert = require('assert')
const ConnexionController = require('../../app/controllers/ConnexionController')

describe('Fonctions de connexion/inscription ', () => {
    describe('Inscription', () => {
        it("Retourne une erreur si le MDP est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    password: ''
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Password-Null" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Error-Password-Null')
        })

        it("Retourne une erreur si l'email est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: '',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Email-Null" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Error-Email-Null')
        })

        it("Retourne une erreur si le MDP fait moins de 6 caractères", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    password: 'Pass'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Length-Password" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Error-Length-Password')
        })

        it("Retourne une erreur si l'email n'est pas un email valide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet.fr',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Not-Email" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Error-Not-Email')
        })

        it("Crée un user avec MDP et un email", () => {
            // Arrange
            const db = {
                add: (email, password) => {
                    assert.equal(email, 'corentin.fouquet@exemple.fr')
                    assert.equal(password, 'Password')

                    return true
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Ok" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Ok')
        })
    })

    describe('Connexion', () => {
        it("Retourne une erreur si le MDP est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    password: ''
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Password-Null", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Password-Null')
            assert.equal(result.token, '')
            assert.equal(pass, true)
        })

        it("Retourne une erreur si l'email est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: '',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Email-Null", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Email-Null')
            assert.equal(result.token, '')
            assert.equal(pass, true)
        })

        it("Retourne une erreur si l'email n'existe pas", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                get: (email) => {
                    assert.equal(email, 'fouquet.corentin@exemple.fr')

                    pass = true

                    // return undefined
                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'fouquet.corentin@exemple.fr',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Undefined-Email", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Undefined-Email')
            assert.equal(result.token, '')
            assert.equal(pass, true)
        })

        it("Retourne une erreur si le mot de passe est erroné", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                get: (email) => {
                    assert.equal(email, 'corentin.fouquet@exemple.fr')

                    pass = true

                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'fouquet.corentin@exemple.fr',
                    password: 'PassworD'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Wrong-Password", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Wrong-Password')
            assert.equal(result.token, '')
            assert.equal(pass, true)
        })

        it("Retourne un token si les identifiants sont bons", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                get: (email) => {
                    assert.equal(email, 'corentin.fouquet@exemple.fr')

                    pass = true

                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'fouquet.corentin@exemple.fr',
                    password: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Ok", token : "Connected" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Ok')
            assert.equal(result.token, 'Connected')
            assert.equal(pass, true)
        })
    })

    describe('Mot de passe oublié', () => {
        it("Retourne une erreur si le nouveau MDP est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    newPassword: '',
                    oldPassword: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-NewPassword-Null" }
                    result = value
                }
            }

            // Act
            connexionController.ForgetPw(req, res)

            // Assert
            assert.equal(result.result, 'Error-NewPassword-Null')
        })

        it("Retourne une erreur si l'ancien MDP est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    newPassword: 'PassworD',
                    oldPassword: ''
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-OldPassword-Null" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-OldPassword-Null')
        })

        it("Retourne une erreur si l'email est vide", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: '',
                    newPassword: 'PassworD',
                    oldPassword: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Email-Null", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Email-Null')
        })

        it("Retourne une erreur si l'email n'existe pas", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                get: (email) => {
                    assert.equal(email, 'fouquet.corentin@exemple.fr')

                    pass = true

                    // return undefined
                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'fouquet.corentin@exemple.fr',
                    newPassword: 'PassworD',
                    oldPassword: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Undefined-Email", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Undefined-Email')
        })

        it("Retourne une erreur si le mot de passe est erroné", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                get: (email) => {
                    assert.equal(email, 'corentin.fouquet@exemple.fr')

                    pass = true

                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    newPassword: 'PassworD',
                    oldPassword: 'Passwor'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Wrong-Password", token : "" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Error-Wrong-Password')
        })

        it("Retourne une erreur si le nouveau MDP fait moins de 6 caractères", () => {
            // Arrange
            const db = {
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    newPassword: 'Pass',
                    oldPassword: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Length-Password" }
                    result = value
                }
            }

            // Act
            connexionController.register(req, res)

            // Assert
            assert.equal(result.result, 'Error-Length-Password')
        })

        it("Change le mot de passe si les identifiants sont bons", () => {
            // Arrange
            const data = {
                'corentin.fouquet@exemple.fr': 'Password',
                'killian.ronvel@exemple.fr': 'ToiPlusMoi'
            }
            let pass = false
            const db = {
                put: (email, newPassword) => {
                    assert.equal(email, 'corentin.fouquet@exemple.fr')
                    assert.equal(newPassword, 'PassworD')

                    pass = true

                    return data[email]
                }
            }

            const connexionController = new ConnexionController(db)
            let result = null

            const req = {
                query: {
                    email: 'corentin.fouquet@exemple.fr',
                    newPassword: 'PassworD',
                    oldPassword: 'Password'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Ok" }
                    result = value
                }
            }

            // Act
            connexionController.login(req, res)

            // Assert
            assert.equal(result.result, 'Ok')
            assert.equal(pass, true)
        })
    })
})