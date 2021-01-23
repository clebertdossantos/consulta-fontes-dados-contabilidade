const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const parametros_execucao = {
    "regex" : "TAG",
    "acao" : "COPIAR",
    "tagId" : 118670
}

const headers = {
    "authorization": fontesDados.tokenTesteSuite,
    "user-access": "nHD2kUAmCVRsJ5tRvCQSbYKbF1NsGBFR8JTZIHXCWVI=",
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const fonteDadosConsulta = {
    url : "https://plataforma-scripts.test.betha.cloud/scripts/v1/api/componentes?limit=20&offset=0",
    method: 'get',
    params: parametros,
    headers : headers
}
// axios(fonteDadosConsulta)
//     .then(resp => {
//         for (const iterator of resp.data.content) {
//             axios({
//                 url : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/scripts/${iterator.id}`,
//                 method: 'delete',
//                 headers : headers
//             })
//             .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
//             .catch(err => console.log(err))
//         }
//     })
//     .catch(err => console.log(err))

// fonteDadosConsulta.url = "https://plataforma-scripts.test.betha.cloud/scripts/v1/api/scripts?limit=20&offset=0"

// axios(fonteDadosConsulta)
//         .then(resp => {
//             for (const iterator of resp.data.content) {
//                 axios({
//                     url : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/scripts/${iterator.id}`,
//                     method: 'delete',
//                     headers : headers
//                 })
//                 .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
//                 .catch(err => console.log(err))
//             }
//         })
//         .catch(err => console.log(err))

fonteDadosConsulta.url = "https://plataforma-scripts.test.betha.cloud/scripts/v1/api/fontes-dinamicas?limit=20&offset=0"
axios(fonteDadosConsulta)
    .then(resp => {
        for (const iterator of resp.data.content) {
            axios({
                url : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/scripts/${iterator.id}`,
                method: 'delete',
                headers : headers
            })
            .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))