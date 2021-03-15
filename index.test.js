const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
// const fs= require('fs');
// const fases = require('./js/fases-encerramento');

const headers = {
    // "authorization" : fontesDados.tokenSuite,
    // "user-access" : fontesDados.entidades.diretoriadeprodutos
    "authorization" : "Bearer dd69f4a0-eafd-4507-bac0-6ec9d3d1e0a4",
    "user-access" : "uXolOl8tV6LDRqQIrxQR5q2clsLj0uOI"
}
// const parametros = {
//     "limit" : 100, // podemos jogar uma paginação de até 10000
//     "offset" : 0
// }

// async function getConsultFontData(url) {
//     //return new Promise((resolve,reject) => {
//         const fonteDadosConsulta = {
//             url : "https://contabil-sl.cloud.betha.com.br/contabil/service-layer/v2/api/saldos-iniciais-itens",
//             method: 'get',
//             params: parametros,
//             headers : headers
//         }
//         try{
//             const result = await axios(fonteDadosConsulta)
//             console.log(parametros)
//             for(it of result.data.content.filter((param) => param.content.fase.id === 10979 )){
//                 console.log(JSON.stringify(it))
//             }
//         }catch(e){
//             console.log(">>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<");
//             console.log(e)
//         }
//     //})
// }


// (async () => {
//     for (let index = 0; index <= 60; index++) {
//         const result = await getConsultFontData('xxxx')
//         parametros.offset += parametros.limit
//     }
// })();

const fontes_contabil = (param) => {
    switch (param.identificador) {
        case 'contabilidade': return param.ativos ; break;
        case 'tesouraria': return param.ativos ; break;
        default: return ; break;
    }
}
const URL_METADADOS = "https://plataforma-dados.betha.cloud/dados/api/sistemas/@current/fontes/com-ativos"
const obj_get = {
    "method" : "get",
    "url" : URL_METADADOS,
    "headers" : headers
}

const metadados_obj = async (id) => {
    try{
        const get_metadado = {
            "method" : "get",
            "url" : `https://plataforma-dados.betha.cloud/dados/api/sistemas/@current/ativos/${id}/metadados` ,
            "headers" : headers
        }
        const result = await axios(get_metadado)
        console.log(result)
    }catch(err){
        console.log(err)
    }
}


const metadados = async () => {
    try{
        const result = await axios(obj_get)
        for(it of result.data.filter(fontes_contabil)){
            for(idx = 0 ; idx <= it.ativos.length ; idx++){
                element = it.ativos[idx]
                console.log(element.descricao)
                await metadados_obj(element.id)
                break
            }
            console.log('-------------------------')
            break;
        }
    }catch(e){
        console.log('ERRO')
        console.log(e)
    }
}

(async () => {
    await metadados()
})();


