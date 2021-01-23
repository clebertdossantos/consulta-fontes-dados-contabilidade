const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const parametros_execucao = {
    "regex" : "TAG",
    "acao" : "COPIAR",
    "tagId" : 118827 ,
    "tagDestino" : [{
        "entidadeId": 3890,
        "id": 118828,
        "nome": "-Inicio Exercício 2021 - MG",
        "sistemaId": 68
      }] // Encerramento PR
    // "tagIdDestino" : 
}
// console.log(parametros_execucao);

const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const imprimir = (param) => `[${param.tipo}] -> ${param.url.split('/')[param.url.split('/').length -1]} => ${param.conteudo}`

function getConsultFontData(url) {
    return new Promise((resolve,reject) => {
        for(pag of [100,200,300,400]){
            try{
                parametros.limit = 100 
                parametros.offset = (pag - 100)
                const fonteDadosConsulta = {
                    url : url ,
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        for (const iterator of resp.data.content) {
                            // console.log(iterator);
                            let headers_post = {
                                'authorization' : fontesDados.tokenSuite,
                                'user-access': fontesDados.entidades.diretoriadeprodutos,
                                'content-type' : "application/json"
                            }
                            let json_envio = {
                                "titulo" : iterator.titulo.replace('- ES','- MG'),
                                "descricao" : iterator.descricao,
                                "tags" : parametros_execucao.tagDestino,
                                "chaveNatureza": iterator.chaveNatureza,
                                "descricaoNatureza": iterator.descricaoNatureza,
                                "disponivelConsulta": iterator.disponivelConsulta
                            }
                            axios({
                                url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/".concat(iterator.id).concat("/acoes/copiar"),
                                method: 'post',
                                // params: parametros,
                                headers : headers_post,
                                data : json_envio
                            })
                            .then(aux => {
                                console.log(`[COPIADO] -> ${aux.data.titulo}`)
                            })
                            .catch(err => console.log(`[ERRO] -> ${err}`))
                            // break;
                        }
                    })
                    .catch(err => console.log(`[ERRO] -> ${url} => ${err}`))
            }catch(e){
                console.log(`[ERRO] -> ${url}`)
                console.log(e)
            }
        }
    });
}

for(it of [
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts",
    // "https://plataforma-scripts.betha.cloud/scripts/v1/api/componentes",
    // "https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas",
]){
    let newIt = it
    if(parametros_execucao.regex === "TAG"){
        let array = it.split('/')
        newIt = []
        for(i of array){
            if(array[array.length -1] === "scripts"){
                newIt.push(i)
                if(i === "api"){
                    newIt.push('tags')
                    newIt.push(parametros_execucao.tagId)
                }
            }else{
                newIt.push(i)
                if(i === "componentes" || i === "fontes-dinamicas"){
                    newIt.push('tags')
                    newIt.push(parametros_execucao.tagId)
                    newIt.push('scripts')
                }
            }
        }
        newIt = newIt.join('/')
    }
    console.log(newIt)
    getConsultFontData(newIt)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}
