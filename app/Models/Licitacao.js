'use strict'

const Model = use('Model')

class Licitacao extends Model {
    static get table() {
        return 'licitacoes'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    itens() {
        return this.hasMany('App/Models/Item', 'id', 'licitacoes_id')
    }
}

module.exports = Licitacao
