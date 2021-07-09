const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'authorization' : 'Bearer 321a821f-a2fc-44c4-aa00-33aa2681ecfb',
    'user-access': 'pa951gTixMH7z8h2WlSV2w=='
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0,
    "filter" : `(liberadoPor like "%fabricio.junior%")`
}

// const id_objeto = 149311
const id_objeto = 149312
const tipo_artefato = 'relatorios'

// const URL_BASE = `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/liberacoes/${id_objeto}/itens`
const URL_BASE = 'https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/liberacoes'
console.log(URL_BASE);
// const DELETE_REG = async (params) => {    
//     try {
//         console.log(param_request);
//         result = await axios(param_request)
//         console.log(`[SUCESSO] - ${param_request.url}`)
        
//     } catch (error) {
//         console.log(`[ERRO] - ${param_request.url}`)
//         console.log(error.config)
//     }
// }


(async () => {
    console.log('>> CONSULTADO STATUS FLEXIBILIAÇÕES <<');
    var em_andamento = 0
    var concluido = 0 
    try {
        const param_request = {
            url : URL_BASE,
            method: 'get',
            headers : headers,
            params : parametros
        }
        const result = await axios(param_request)
        for(it of result.data.content){
            console.log(it);
            console.log(`[LIBERACAO] - ${it.liberadoPor} - ${it.liberadoEm} - ${it.tipoClientes.description}`)
            // buscar objetos orquestrados
            const param_obj = {
                "limit" : 100 ,
                "offset" : 0 
            }
            const request_obj = {
                'method' : 'get',
                'url' : `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/liberacoes/${it.id}/objetos`,
                'headers' : headers
            }
            const result_obj = await axios(request_obj)
            result_obj.data.content.forEach(objeto => {
                console.log(`[ARTEFATO] - ${objeto.titulo} [${objeto.recurso}]`) ;
            })
            // buscar status orquestrações por cliente
            const param_itens = {
                "limit" : 25 ,
                "offset" : 0 
            }
            var condition = true
            while (condition) {
                const request_itens = {
                    'method' : 'get',
                    'url' : `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/liberacoes/${it.id}/itens`,
                    'headers' : headers
                }
                const result_itens = await axios(request_itens)
                for(itens of result_itens.data.content){
                    if(itens.status.value !== "C"){
                        console.log(`[${itens.status.description}] - Cliente : ${itens.cliente}`);
                    }
                }
                condition = result_itens.data.hasNext
                param_itens.offset += param_itens.limit
                console.log(JSON.stringify(param_itens));
            }
            break
        } 
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }

    console.log('>>>>> STATUS ORQUESTRAÇÕES <<<<<<')
    console.log(`Concluído : ${concluido}`)
    console.log(`Andamento : ${em_andamento}`)

})();


