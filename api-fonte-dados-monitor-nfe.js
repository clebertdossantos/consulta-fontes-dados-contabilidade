const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');

const headers = {
    'authorization' : 'Bearer 3a1c0207-2909-4919-ac98-1318e4b1abc6'
}

const parametros = {
    "limit" : 1000, // podemos jogar uma paginação de até 10000
    "offset" : 0,
    "filter" : `situacao = 'AUTORIZADA' and dataHoraRecebimento >= '2020-12-29T00:00:00' and dataHoraRecebimento < '2020-12-30T00:00:00'`
}

const API_FONTE_DADOS = "https://monitor-dfe.betha.cloud/monitor-dfe-dados/api/nfe"

async function getConsultFontData(url) {
    //return new Promise((resolve,reject) => {
        const fonteDadosConsulta = {
            url : API_FONTE_DADOS ,
            method: 'get',
            params: parametros,
            headers : headers
        }
        try{
            const result = await axios(fonteDadosConsulta)
            console.log(parametros.limit,parametros.offset)
            let count = 0 
            for(it of result.data.content.filter((param) => param.numero === "27676")){
            // for(it of result.data.content){
                count++
                console.log(count,JSON.stringify(it))
            }
        }catch(e){
            console.log(">>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<");
            console.log(e)
        }
    //})
}


(async () => {
    for (let index = 0; index < 5; index++) {
        parametros.offset += parametros.limit
        const result = await getConsultFontData('xxxx')
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