'use strict'

const Model = use('Model')

class Item extends Model {
    // static boot() {
    //     super.boot()
        
    //     this.addHook('afterFetch', async items => {
    //         for (let item of items) {
    //             item.preco_avg = await this.query().where('materiais_id', item.materiais_id).getAvg('preco') || 0
    //             // item.preco_min = await this.query().where('materiais_id', item.materiais_id).getMin('preco') || 0
    //             // item.preco_max = await this.query().where('materiais_id', item.materiais_id).getMax('preco') || 0
    //         }
    //     })
    // }

    static get table() {
        return 'itens'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    material() {
        return this.hasOne('App/Models/Material', 'materiais_id', 'id')
    }

    servico() {
        return this.hasOne('App/Models/Servico', 'servicos_id', 'id')
    }

    fornecedor() {
        return this.hasOne('App/Models/Fornecedor', 'fornecedores_id', 'id')
    }
}

module.exports = Item
