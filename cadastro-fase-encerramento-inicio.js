const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fases = require("./js/fases-encerramento")
const fs= require('fs')

const headers = {
    'App-Context': "eyJleGVyY2ljaW8iOjIwMjB9",
    'authorization' : "Bearer d4fc588c-4939-4d17-b927-10b178fa8d14",
    'user-access': "1Smx2QtX7wQ="
}
// const headers = {
//     'authorization' : fontesDados.tokenSuite,
//     'user-access': fontesDados.entidades.diretoriadeprodutos
// }
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const plano_contas = 3295

function getConsultFontData(nome) {
    return new Promise((resolve,reject) => {
        for(pag of [100,200,300,400]){
            try{
                parametros.limit = 100 
                parametros.offset = (pag - 100)
                const fonteDadosConsulta = {
                    // url : 'https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts',
                    url : 'https://plataforma-scripts.test.betha.cloud/scripts/v1/api/scripts',
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        for(idx of resp.data.content){
                            if(idx.titulo === nome){
                                // console.log(idx.id,idx.titulo)
                                const json_post = {
                                    "descricao": fases.tituloFase(idx.titulo),
                                    "tipo": {
                                        "key": "LANCAMENTO_ENCERRAMENTO"
                                    },
                                    "idScript": idx.id
                                }
                                axios({
                                    "url" : `https://esc-api-rest.test.bethacloud.com.br/escrituracao/api/configuracoes-planos-contas/${plano_contas}/fases`,
                                    "method" : 'post',
                                    "data" : json_post,
                                    "headers" : headers
                                })
                                .then(resp => console.log('[SUCESSO] -> ',resp.data.descricao))
                                .catch(err => console.log('[ERRO] -> Não foi possivel inserir o cadastro de fase para o script :',idx.titulo,err))
                            }
                        }
                    })
                    .catch(err => console.log(`[ERRO] -> ${nome} => ${err}`))
            }catch(e){
                console.log(`[ERRO] -> ${nome}`)
                console.log(e)
            }
        }
    });
}

for(it of fases.nomeFasePR){
    // console.log(it);
    getConsultFontData(it)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}
