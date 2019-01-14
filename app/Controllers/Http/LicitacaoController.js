'use strict'

const axios = require('axios')
const moment = require('moment')

class LicitacaoController {
    async index({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'
        let uasg = params.unidade
        let data_min = moment(params.data_min).format('YYYY-MM-DD')
        let data_max = moment(params.data_max).format('YYYY-MM-DD')
        
        let res = await axios.get(`${base}/licitacoes/v1/licitacoes.json?uasg=${uasg}&data_publicacao_min=${data_min}&data_publicacao_max=${data_max}`)
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
        let numero = params.numero

        let res = await axios.get(`${base}/licitacoes/id/licitacao/${numero}.json`)
        let licitacao = res.data

        res = await axios.get(`${base}/licitacoes/id/licitacao/${numero}/itens.json`)
        licitacao.itens = res.data._embedded.itensLicitacao

        return licitacao
    }
}

module.exports = LicitacaoController
