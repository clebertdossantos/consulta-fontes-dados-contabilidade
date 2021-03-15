const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');

const headers = {
    'authorization' : 'Bearer 5d12c6ab-b5b9-4099-a2af-11b4540420cc',
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const API_SERVICE_LAYER = "https://contabil-sl.cloud.betha.com.br/contabil/service-layer/v2/api/saldos-iniciais-itens"
// const API_SERVICE_LAYER = "https://contabil-sl.cloud.betha.com.br/contabil/service-layer/v2/api/fases"


async function getConsultFontData(url) {
    //return new Promise((resolve,reject) => {
        const fonteDadosConsulta = {
            url : API_SERVICE_LAYER ,
            method: 'get',
            params: parametros,
            headers : headers
        }
        try{
            const result = await axios(fonteDadosConsulta)
            console.log(parametros)
            // for(it of result.data.content){
            // for(it of result.data.content
            //         .filter((param) => param.content.exercicio.ano === 2021)
            //         .filter((param) => param.content.tipo.value === "S")
            //         .filter((param) => param.content.configuracao.id === 4524)){
            for(it of result.data.content.filter((param) => param.content.contaContabil.id === 5010834)){
                console.log(JSON.stringify(it))
                console.log(typeof it.content.contaContabil.id)
                console.log(typeof it.content.tipo.key)            
                console.log('*************')            
            }
        }catch(e){
            console.log(">>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<");
            console.log(e)
        }
    //})
}


(async () => {
    for (let index = 0; index < 2; index++) {
        const result = await getConsultFontData('xxxx')
        parametros.offset += parametros.limit
    }
})();




