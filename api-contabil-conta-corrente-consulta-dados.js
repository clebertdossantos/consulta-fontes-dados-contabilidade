const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');

const headers = {
    // 'authorization' : fontesDados.tokenSistemas,
    'authorization' : 'Bearer 19f028a7-3d53-401d-9ad2-2d0324ccca62',
    'user-access' : 't9vHkXAhUJZR6KHlAsTf0w==',
    'app-context': 'eyJleGVyY2ljaW8iOjIwMjF9'
}
const parametros = {
    "limit" : 20, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const API_CONTABIL = "https://esc-api-rest.cloud.betha.com.br/escrituracao/api/configuracoes-planos-contas/4950/saldos-iniciais-itens/305768/contas-correntes/SU5GT1JNQURPfDE0MDMyMzh8MTU4NDg0/itens"

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
            // console.log(parametros)
            for(it of result.data.content){
                console.log(`${it.componentes[1].valor}|${it.componentes[2].valor}|${it.valor}`)
                // console.log(it.contaContabil.mascara,' >> ',it.valor)
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