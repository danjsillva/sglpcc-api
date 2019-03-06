'use strict'

const Model = use('Model')

class Fornecedor extends Model {
    static get table() {
        return 'fornecedores'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
}

module.exports = Fornecedor
