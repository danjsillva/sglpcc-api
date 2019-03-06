'use strict'

const Orgao = use('App/Models/Orgao')

class OrgaoController {
    async index({ request, response, params }) {
        let orgaos = await Orgao.query()
            .with('unidades')
            .fetch()

        return orgaos
    }
}

module.exports = OrgaoController
