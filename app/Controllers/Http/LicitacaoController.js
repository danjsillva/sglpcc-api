'use strict'

const axios = require('axios')
const moment = require('moment')

class LicitacaoController {
    async index({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'
        let data_min = moment(params.data_min).format('DD/MM/YYYY')
        let data_max = moment(params.data_max).format('DD/MM/YYYY')
        
        // let res = await axios.get(`${base}/licitacoes/v1/licitacoes.json?uasg=${params.unidade}&data_abertura_proposta_min=${data_min}&data_abertura_proposta_max=${data_max}`)
        let res = await axios.get(`${base}/licitacoes/v1/licitacoes.json?uasg=${params.unidade}`)
        let links = res.data._links
        let licitacoes = await res.data._embedded.licitacoes

        while(links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links

            licitacoes = await licitacoes.concat(res.data._embedded.licitacoes)
        }
        
        return licitacoes
    }

    async show({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'

        let res = await axios.get(`${base}/licitacoes/id/licitacao/${params.numero}.json`)
        let licitacao = res.data

        res = await axios.get(`${base}/licitacoes/id/licitacao/${params.numero}/itens.json`)
        licitacao.itens = res.data._embedded.itensLicitacao

        return licitacao
    }
}

module.exports = LicitacaoController
