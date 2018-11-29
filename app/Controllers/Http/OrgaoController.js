'use strict'

const axios = require('axios')

class OrgaoController {
    async index({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'

        let res = await axios.get(`${base}/licitacoes/v1/orgaos.json`)
        let links = res.data._links
        let orgaos = await res.data._embedded.Orgaos

        while(links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links

            orgaos = await orgaos.concat(res.data._embedded.Orgaos)
        }
        
        return orgaos
    }
}

module.exports = OrgaoController
