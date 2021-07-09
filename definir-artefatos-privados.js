const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'authorization' : 'Bearer 7a28ea3d-9803-4b16-9770-ac4cd658a563',
    'user-access': 'w7UuXTlGo2Zx0LkYuUbL6RTaT9xuruUu'
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0,
    "filter" : "(artefato.id = '1134026' and artefato.tipo = 'RELATORIO' and artefato.emModoRascunho = false)"
}

const usuario = 'cleber.santos'
const URL_BASE = `https://plataforma-execucoes.betha.cloud/v1/api/execucoes`
console.log(URL_BASE);

(async () => { 
    try {
        condition = true
        while(condition){
            const param_request = {
                url : URL_BASE ,
                method: 'get',
                headers : headers,
                params : parametros
            }
            const result = await axios(param_request)
            // console.log(`Pagina : ${JSON.stringify(parametros)}`);
            for(it of result.data.content){
                if(it.visibilidade.value === "PUBLICO" && it.autor === usuario){
                // if(it.visibilidade.value === "PRIVADO" && it.autor === usuario){
                    const param_request_put = {
                        url : `${URL_BASE}/${it.id}/visibilidade` ,
                        method: 'put',
                        headers : headers,
                        data : JSON.parse(`{"visibilidade":{"value":"PRIVADO"}}`)
                        // data : JSON.parse(`{"visibilidade":{"value":"PUBLICO"}}`)
                    }
                    try{
                        // console.log(it);
                        const result_put = await axios(param_request_put)
                        console.log(`SUCESSO - ${it.id}`)
                    }catch(e){
                        console.log(`ERRO - Erro ao tornar o artefato privado! ${it.id}`);
                    }
                }else{
                    continue;
                }
            }
            condition = result.data.hasNext
            parametros.offset += parametros.limit
        }
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }
})();


