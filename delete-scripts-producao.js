const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const parametros_execucao = {
    "regex" : "TAG",
    "acao" : "COPIAR",
    "tagId" : 118828
}

const headers = {
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const fonteDadosConsulta = {
    url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/tags/118828/scripts?limit=20&offset=0",
    method: 'get',
    params: parametros,
    headers : headers
}
axios(fonteDadosConsulta)
    .then(resp => {
        for (const iterator of resp.data.content) {
            axios({
                url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${iterator.id}`,
                method: 'delete',
                headers : headers
            })
            .then(aux => console.log(`[SUCESSO] -> Exclusão do script : ${iterator.titulo}`))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

    