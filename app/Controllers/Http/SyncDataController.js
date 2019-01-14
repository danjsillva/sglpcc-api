'use strict'

const axios = require('axios')
const moment = require('moment')

const Usuario = use('App/Models/Usuario')
const Orgao = use('App/Models/Orgao')
const Unidade = use('App/Models/Unidade')
const Licitacao = use('App/Models/Licitacao')
const Item = use('App/Models/Item')

class SyncDataController {
    async itens({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'
        // let uasg = 158145
        let data_min = moment().startOf('month').subtract(1, 'year').format('YYYY-MM-DD')
        let data_max = moment().endOf('month').subtract(1, 'month').format('YYYY-MM-DD')
        let url = `${base}/licitacoes/doc/licitacao/15322901000011999/itens.json?data_abertura_proposta_min=${data_min}&data_abertura_proposta_max=${data_max}`

        let res = await axios.get(url)

        let links = res.data._links
        let licitacoes = await res.data._embedded.licitacoes

        while (links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links

            licitacoes = await licitacoes.concat(res.data._embedded.licitacoes)
        }

        licitacoes.map(async elem => {
            let item = new Item
            await item.merge(elem)
            await item.save()
        })

        return true
    }

    async licitacoes({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'
        // let uasg = 158145
        let data_min = moment().startOf('month').subtract(1, 'year').format('YYYY-MM-DD')
        let data_max = moment().endOf('month').subtract(1, 'month').format('YYYY-MM-DD')
        let url = `${base}/licitacoes/v1/licitacoes.json?data_abertura_proposta_min=${data_min}&data_abertura_proposta_max=${data_max}`

        let res = await axios.get(url)

        let links = res.data._links
        let licitacoes = await res.data._embedded.licitacoes

        while (links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links

            licitacoes = await licitacoes.concat(res.data._embedded.licitacoes)
        }

        licitacoes.map(async elem => {
            let licitacao = new Licitacao
            await licitacao.merge(elem)


            let url2 = `${base}/licitacoes/doc/licitacao/${elem.identificador}/itens.json?`
            let res2 = await axios.get(url2)

            let links2 = res2.data._links
            let itens = await res.data._embedded.itensLicitacao

            while (links2.next != null) {
                res2 = await axios.get(`${base}${links2.next.href}`)
                links2 = res2.data._links

                itens = await itens.concat(res2.data._embedded.itensLicitacao)
            }

            licitacao.itens = itens
            
            await licitacao.save()
        })

        return true
    }
}

module.exports = SyncDataController
