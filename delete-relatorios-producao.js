const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const parametros_execucao = {
    "regex" : "TAG",
    "acao" : "COPIAR",
    "tagId" : 118828
}

const headers = {
    // 'authorization' : fontesDados.tokenSuite,
    // 'user-access': fontesDados.entidades.diretoriadeprodutos
    'authorization': 'Bearer 5af9859e-34f1-46df-8152-7cd4c174947c',
    'user-access': 'uXolOl8tV6LDRqQIrxQR5q2clsLj0uOI'
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const fonteDadosConsulta = {
    url : "https://plataforma-relatorios.betha.cloud/relatorios/v1/api/relatorios?filter=(titulo+like+%22%2525con-%2525%22)&limit=20&offset=0",
    method: 'get',
    // params: parametros,
    headers : headers
}
axios(fonteDadosConsulta)
    .then(resp => {
        console.log(resp)
        // for (const iterator of resp.data.content) {
        for (const iterator of [
            220444
        ]) {
            axios({
                // url : `https://plataforma-relatorios.betha.cloud/relatorios/v1/api/relatorios/${iterator.id}`,
                url : `https://plataforma-relatorios.betha.cloud/relatorios/v1/api/relatorios/${iterator}`,
                method: 'delete',
                headers : headers
            })
            // .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
            .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator}`))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

    