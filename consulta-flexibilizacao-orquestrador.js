const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'authorization' : 'Bearer a6f7ff07-bf6c-44ca-93f6-34274ad367ca',
    'user-access': 'pa951gTixMH7z8h2WlSV2w=='
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

// const id_objeto = 149311
const id_objeto = 149312
const tipo_artefato = 'relatorios'

const URL_BASE = `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/liberacoes/${id_objeto}/itens`
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
        for(let index = 0; index < 170 ; index++){
            if(index !== 0){
                parametros.offset += 100
            }
            const param_request = {
                url : URL_BASE ,
                method: 'get',
                headers : headers,
                params : parametros
            }
            const result = await axios(param_request)
            for(it of result.data.content){
                // param_delete = {
                //     "url" : `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/flexibilizacoes?id=${it.id}`,
                //     "method" : 'get',
                //     "headers" : headers
                // }
                // try {
                //     content_delete = await axios(param_delete)
                //     console.log(`Entidade: ${it.cliente}`)
                // } catch(error){
                //     console.log("ERROR DELETE")
                // }
                // console.log(typeof it.cliente, it.cliente);
                // if(it.cliente.toString() === '32'){
                    if(it.status.value === "A"){
                        em_andamento++
                        console.log('[EM ANDAMENTO] - ',it.cliente,' >> ',it.objeto.titulo)
                    }else if(it.status.value === "C"){
                        concluido++
                        console.log('[CONCLUÍDO] - ',it.cliente,' >> ',it.objeto.titulo)
                    }
                // }
            }
        }
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }

    console.log('>>>>> STATUS ORQUESTRAÇÕES <<<<<<')
    console.log(`Concluído : ${concluido}`)
    console.log(`Andamento : ${em_andamento}`)

})();


