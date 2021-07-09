const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'authorization' : 'Bearer 88bbe61e-817f-49e2-8a04-f43b79363abf',
    'user-access': 'GcRNrbp_al6ElTvOWlnAuQ=='
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const id_objeto = 289464
const tipo_artefato = 'relatorios'
const URL_BASE = `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/clientes/3291/flexibilizacoes`

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
                // console.log(typeof it.objeto.sistema);
                var resultSearch = it.objeto.titulo.search(/APLIC 2020|APLIC 2021/)
                if(it.objeto.sistema == 151 && resultSearch != -1){
                        param_delete = {
                            "url" : `https://plataforma-orquestrador.betha.cloud/orquestrador/v1/api/flexibilizacoes?id=${it.id}`,
                            "method" : 'delete',
                            "headers" : headers
                        }
                        try {
                            content_delete = await axios(param_delete)
                            console.log(`Excluido Artefato : ${it.objeto.titulo}`)
                        } catch(error){
                            console.log("ERROR DELETE")
                        }
                }else{
                    continue;
                }
            }
        }
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }
})();
