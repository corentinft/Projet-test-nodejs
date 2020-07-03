const assert = require('assert')
const FormContactController = require('../../app/controllers/FormContactController')

let formContactController = null
let result = null
let pass = false

describe("Fonctions d'un formulaire de contact ", () => {
    beforeEach(() => {
        // Arrange
        const db = {
            sendContact: form => {
                assert.equal(form.email, 'killian.ronvel@exemple.fr')
                assert.equal(form.name, 'Patrick')
                assert.equal(form.surname, 'Balkany')

                pass = true

                return true
            }
        }

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
                    surname: 'jean-Luc',
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

        it("Valide le form et l'envoi dans la bdd", () => {
            // Arrange
            const req = {
                query: {
                    email: 'killian.ronvel@exemple.fr',
                    name: 'Patrick',
                    surname: 'Balkany',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut imperdiet neque, at molestie urna. Pellentesque ac odio sed lacus finibus vehicula. Vivamus ultrices neque et ipsum sollicitudin consequat. Morbi eget dolor tortor. Aenean fringilla, quam non tristique sodales, mi leo ultrices enim, vitae tempor arcu enim id risus'
                }
            }
            const res = {
                send: value => {
                    // value = { result : "Ok" }
                    result = value
                }
            }

            // Act
            formContactController.sendForm(req, res)

            // Assert
            assert.equal(result.result, 'Ok')
            assert.equal(pass, true)
        })
    })
})