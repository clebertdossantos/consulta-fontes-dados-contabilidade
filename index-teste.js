
const lista = [1,2,3,4,5,6]
const qtd = 2

console.log(lista.length/qtd)






return 



const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');

const parametros_execucao = {
    "regex" : "TAG", // TITULO,TAG,CODIGO
    "tagId" : 118804,
    "regexCodigo" : /movimentacaoBalanceteMensalDespesa/,
    "regexTitulo" : /SC-2020/
}


const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const ordenacao = function (a, b) {
    if (a.seq > b.seq) {
      return 1;
    }
    if (a.seq < b.seq) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

function getConsultFontData(url) {
    return new Promise((resolve,reject) => {
        const fonteDadosConsulta = {
            url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/tags/118828/scripts" ,
            method: 'get',
            params: parametros,
            headers : headers
        }
        axios(fonteDadosConsulta)
            .then(resp =>{ 
                let array = []
                // for(it of resp.data.content.filter((a) => a.chaveNatureza == 'ENCERRAMENTO_EXERCICIO')){
                // for(it of resp.data.content.filter((a) => a.chaveNatureza == 'ABERTURA_EXERCICIO')){
                for(it of resp.data.content){
                    console.log(it.titulo)
                }
                
            })
            .catch(err => console.log(err))
    })
}

getConsultFontData("sadasd")



