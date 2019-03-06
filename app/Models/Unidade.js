'use strict'

const Model = use('Model')

class Unidade extends Model {
    static get table() {
        return 'unidades'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    orgao() {
        return this.belongsTo('App/Models/Orgao', 'orgaos_id', 'id')
    }
}

module.exports = Unidade
