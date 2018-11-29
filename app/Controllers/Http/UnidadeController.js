'use strict'

const axios = require('axios')

class UnidadeController {
    async index({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'

        let res = await axios.get(`${base}/licitacoes/v1/uasgs.json?id_orgao=${params.orgao}`)
        let links = res.data._links
        let unidades = await res.data._embedded.uasgs

        while(links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links

            unidades = await unidades.concat(res.data._embedded.uasgs)
        }
        
        return unidades
    }
}

module.exports = UnidadeController
