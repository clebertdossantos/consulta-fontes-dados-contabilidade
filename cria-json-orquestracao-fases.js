const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');

const headers = {
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos
}
const parametros = {
    "limit" : 100,
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
            url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/tags/118825/scripts" ,
            method: 'get',
            params: parametros,
            headers : headers
        }
        axios(fonteDadosConsulta)
            .then(resp =>{ 
                let array = []
                for(it of resp.data.content.filter((a) => a.chaveNatureza == 'INICIO_EXERCICIO')){
                // for(it of resp.data.content.filter((a) => a.chaveNatureza == 'ABERTURA_EXERCICIO')){
                // for(it of resp.data.content.filter((a) => a.chaveNatureza == 'ENCERRAMENTO_EXERCICIO')){
                    let obj = {
                        "descricao": fases.tituloFase(it.titulo),
                        "scriptTitulo": it.titulo,
                        "seq": parseInt(it.titulo.substring(0,2)),
                        "predessesoras": []
                        // "predessesoras": fases.predecessora(parseInt(it.titulo.substring(0,2)))
                    }
                    array.push(obj)
                }
                return array
            }).then(resp => {
                let json_saida = {
                    "configuracao" : {
                        "descricao": "Inicio do Exercício 2021",
                        // "descricao": "Abertura do Exercício 2021",
                        // "descricao": "Encerramento do Exercício 2020",
                        "tipo": {
                            "key": "SALDO_INICIAL"
                            // "key": "LANCAMENTO_ABERTURA"
                            // "key": "LANCAMENTO_ENCERRAMENTO"
                        },
                        "fases" : resp.sort(ordenacao)
                    }
                }
                console.log(JSON.stringify(json_saida))
            })
            .catch(err => console.log(err))
    })
}

getConsultFontData("sadasd")
