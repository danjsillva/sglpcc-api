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

    unidade() {
        return this.hasOne('App/Models/Unidade', 'unidades_id', 'id')
    }

    itens() {
        return this.hasMany('App/Models/Item', 'id', 'licitacoes_id')
    }
}

module.exports = Licitacao
