'use strict'

const Model = use('Model')

class Orgao extends Model {
    static get table() {
        return 'orgaos'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    unidades() {
        return this.hasMany('App/Models/Unidade', 'id', 'orgaos_id')
    }
}

module.exports = Orgao
