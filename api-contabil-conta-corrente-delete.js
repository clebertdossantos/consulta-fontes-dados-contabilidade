const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');
const base64 = require('base-64')

const headers = {
    // 'authorization' : fontesDados.tokenSistemas,
    'authorization' : 'Bearer 3e73f0fc-fcb6-4e20-922b-dc26f0fd7250',
    'user-access' : 't9vHkXAhUJZR6KHlAsTf0w==',
    'app-context': 'eyJleGVyY2ljaW8iOjIwMjF9'
}
const parametros = {
    "limit" : 20, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const API_CONTABIL = "https://esc-api-rest.cloud.betha.com.br/escrituracao/api/configuracoes-planos-contas/4950/lancamentos-abertura/TEFOQ0FNRU5UT19BQkVSVFVSQXwzMDU4MDU%3D/itens/16578/contas-correntes/SU5GT1JNQURPfDE0MDg1NjJ8MTU4NDkw/itens"

async function getConsultFontData(url) {
    //return new Promise((resolve,reject) => {
        const fonteDadosConsulta = {
            url : API_CONTABIL ,
            method: 'get',
            params: parametros,
            headers : headers
        }
        try{
            const result = await axios(fonteDadosConsulta)
            console.log(parametros)
            for(it of result.data.content){
                // console.log(JSON.stringify(it))
                // console.log(it.contaContabil.mascara,' >> ',it.valor)
                try{
                    const del = await axios({
                        url : `https://esc-api-rest.cloud.betha.com.br/escrituracao/api/configuracoes-planos-contas/4950/lancamentos-abertura/TEFOQ0FNRU5UT19BQkVSVFVSQXwzMDU4MDU%3D/itens/16578/contas-correntes/SU5GT1JNQURPfDE0MDg1NjJ8MTU4NDkw/itens/${it.id}`,
                        method : 'delete',
                        headers : headers
                    })
                    console.log(base64.decode(del.data.id))
                }catch(e){
                    console.log(`[ERRO] - Problema para excluir o conta corrente ${JSON.stringify(it)}`)
                }
            }
        }catch(e){
            console.log(">>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<");
            console.log(e)
        }
    //})
}


(async () => {
    for (let index = 0; index < 10; index++) {
        const result = await getConsultFontData('xxxx')
        parametros.offset += parametros.limit
    }
})();




/*
2111101020000000000
2111101030000000000
2111103030000000000
2121102010000000000 
2123101980000000000
2141311000000000001
2189114000000000000
2221102980000000000
2223101980000000000

*/

