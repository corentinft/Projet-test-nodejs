const assert = require('assert')
const FormContactController = require('../../app/controllers/FormContactController')

let formContactController = null
let result = null

describe("Fonctions d'un formulaire de contact ", () => {
    beforeEach(() => {
        // Arrange
        const db = {}

        formContactController = new FormContactController(db)

        result = null

    })
    describe('Contact', () => {
        it("Retourne une erreur si l'email est vide", () => {
            // Arrange
            const req = {
                query: {
                    email: '',
                    name: 'Patrick',
                    surname: 'Balkany',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Email-Null" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Email-Null')
        })

        it("Retourne une erreur si le Prénom est vide", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel@exemple.fr',
                    name: '',
                    surname: 'Balkany',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Name-Null" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Name-Null')
        })

        it("Retourne une erreur si le Nom est vide", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel@exemple.fr',
                    name: 'Patrick',
                    surname: '',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Surname-Null" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Surname-Null')
        })

        it("Retourne une erreur si l'email n'est pas un email valide", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel.fr',
                    name: 'Patrick',
                    surname: '',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Not-Email" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Not-Email')
        })

        it("Retourne une erreur si le Prénom et le Nom sont identique", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel@exemple.fr',
                    name: 'Patrick',
                    surname: 'Patrick',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Same-Name-Surname" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Same-Name-Surname')
        })
        it("Retourne une erreur si le message fait moins de 10 caractères", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel@exemple.fr',
                    name: 'Patrick',
                    surname: 'Balkany',
                    message: 'Coucou'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Error-Length-Message" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Error-Length-Message')
        })
    })
})