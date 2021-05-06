const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'authorization' : 'Bearer 0c8cec48-5b02-4783-be67-b6175febdb96',
    'user-access': 'pa951gTixMH7z8h2WlSV2w=='
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const id_objeto = 289464
const tipo_artefato = 'relatorios'
const URL_BASE = `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/recursos/${tipo_artefato}/objetos/${id_objeto}/flexibilizacoes`

const DELETE_REG = async (params) => {    
    try {
        console.log(param_request);
        result = await axios(param_request)
        console.log(`[SUCESSO] - ${param_request.url}`)
        
    } catch (error) {
        console.log(`[ERRO] - ${param_request.url}`)
        console.log(error.config)
    }
}



(async () => {
    console.log('>> REMOVENDO ORQUESTRAÇÕES <<');
    try {
        for (let index = 0; index < 20 ; index++) {
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
                param_delete = {
                    "url" : `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/flexibilizacoes?id=${it.id}`,
                    "method" : 'delete',
                    "headers" : headers
                }
                try {
                    content_delete = await axios(param_delete)
                    console.log(`Entidade: ${it.cliente}`)
                } catch(error){
                    console.log("ERROR DELETE")
                }
            }
        }
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }
})();
