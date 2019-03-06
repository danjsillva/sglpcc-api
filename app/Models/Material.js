'use strict'

const Model = use('Model')

class Material extends Model {
    static get table() {
        return 'materiais'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
}

module.exports = Material
