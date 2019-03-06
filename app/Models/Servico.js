'use strict'

const Model = use('Model')

class Servico extends Model {
    static get table() {
        return 'servicos'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
}

module.exports = Servico
