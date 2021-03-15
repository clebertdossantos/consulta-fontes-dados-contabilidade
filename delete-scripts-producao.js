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

// for (const iterator of resp.data.content) {
for (const iterator of [
    1461756,
  1461757,
  1545334,
  1530669,
  1530681,
  1570088,
  132519,
  641536,
  191241
    ]) {
    axios({
        // url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas/${iterator.id}`,
        url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${iterator}`,
        method: 'delete',
        headers : headers
    })
    // .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
    .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator}`))
    .catch(err => console.log(err))
}


    