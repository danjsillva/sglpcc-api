'use strict'

const axios = require('axios')
const moment = require('moment')

class ItemController {
    async index({ request, response, params }) {
        let base = 'http://compras.dados.gov.br'
        let data_min = moment().subtract(12, 'month').format('YYYYMMDD')
        let data_max = moment().format('YYYYMMDD')
        let url = `${base}/licitacoes/v1/licitacoes.json?data_abertura_proposta_min=${data_min}&data_abertura_proposta_max=${data_max}&`

        // busca as licitacoes que possuem o material/servico
        if(params.material != 0)
            url += `item_material=${params.material}`
        if(params.servico != 0)
            url += `item_servico=${params.servico}`

            
        let res = await axios.get(url)
        let links = res.data._links
        let licitacoes = await res.data._embedded.licitacoes
        
        while(links.next != null) {
            res = await axios.get(`${base}${links.next.href}`)
            links = res.data._links
            
            licitacoes = await licitacoes.concat(res.data._embedded.licitacoes)
        }
            
        console.log(url);
        console.log(licitacoes.length);
        
        // busca os precos do material/servico em cada licitacao
        let quantidade = 0
        let minimo = 0
        let maximo = 0
        let soma = 0
        let media = 0
        let mediana = 0

        for (const licitacao of licitacoes) {
            let res = await axios.get(`${base}/licitacoes/id/preco_praticado/${licitacao.identificador}/itens.json`)
            let itens = await res.data._embedded.itensPrecoPraticado

            for (const item of itens) {
                if(item.codigo_item_material != 0 && item.codigo_item_material == params.material && item.valor_unitario > 0) {                                        
                    minimo = minimo == 0 ? item.valor_unitario : item.valor_unitario < minimo ? item.valor_unitario : minimo
                    maximo = item.valor_unitario > maximo ? item.valor_unitario : maximo
                    soma += item.valor_unitario
                    quantidade += 1
                }

                if(item.codigo_item_servico != 0 && item.codigo_item_servico == params.servico && item.valor_unitario > 0) {
                    minimo = minimo == 0 ? item.valor_unitario : item.valor_unitario < minimo ? item.valor_unitario : minimo
                    maximo = item.valor_unitario > maximo ? item.valor_unitario : maximo
                    soma += item.valor_unitario
                    quantidade += 1
                }
            }
        }
        
        media = soma / quantidade
        mediana = (minimo + maximo) / 2
        
        return { quantidade, minimo, maximo, media, mediana }
    }
}

module.exports = ItemController
