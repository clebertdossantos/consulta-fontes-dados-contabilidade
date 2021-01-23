const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');
const { resolve } = require('path');
const { DefaultSerializer } = require('v8');

const headers = {
    'authorization' : fontesDados.tokenSuite,
    'user-access': 'EHxJ4kJrcb0CY6Y3zCROwPPEdk_RgPue'
}

let obj = {
    "nome":"Encerramento 2020"
}
const fonteDadosConsulta = {
    url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/tags",
    method: 'post',
    headers : headers,
    data : obj
}

const isEncerramento = true
const isAbertura = false
const isSaldoInicial = false


if(isEncerramento) {
    axios(fonteDadosConsulta)
        .then(resp => {
            return resp.data.id
        })
        .then(tagId => {
            console.log('tagId : ',tagId);
            const consultaNatureza = {
                url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/naturezas/ENCERRAMENTO_EXERCICIO/scripts?limit=20&offset=0",
                method : 'get',
                headers : headers
            }
            const objTag = [{"id" : tagId}]
            axios(consultaNatureza)
                .then(resp => {
                    for(fase of resp.data.content){
                        if(fase.titulo.search(/2019/) !== -1) continue;
                        const vinculoTagFase = {
                            url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${fase.id}/tags`,
                            method : "put",
                            headers : headers,
                            data : objTag
                        }
                        axios(vinculoTagFase)
                            .then(resp => {
                                console.log(`[SUCESSO] -> TAG vinculada para a fase${resp.data.titulo}`)
                            })
                            .catch(err => console.log(err))
                        // break
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}


if(isAbertura){
    fonteDadosConsulta.data = {
        "nome":"Abertura 2021"
    }
    axios(fonteDadosConsulta)
    .then(resp => {
        return resp.data.id
    })
    .then(tagId => {
        console.log('tagId : ',tagId);
        const consultaNatureza = {
            url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/naturezas/ABERTURA_EXERCICIO/scripts?limit=20&offset=0",
            method : 'get',
            headers : headers
        }
        const objTag = [{"id" : tagId}]
        axios(consultaNatureza)
            .then(resp => {
                for(fase of resp.data.content){
                    if(fase.titulo.search(/2020/) !== -1) continue;
                    const vinculoTagFase = {
                        url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${fase.id}/tags`,
                        method : "put",
                        headers : headers,
                        data : objTag
                    }
                    axios(vinculoTagFase)
                        .then(resp => {
                            console.log(`[SUCESSO] -> TAG vinculada para a fase${resp.data.titulo}`)
                        })
                        .catch(err => console.log(err))
                    // break
                }
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

if(isSaldoInicial){
    fonteDadosConsulta.data = {
        "nome":"Saldo Inicial 2021"
    }
    axios(fonteDadosConsulta)
    .then(resp => {
        return resp.data.id
    })
    .then(tagId => {
        console.log('tagId : ',tagId);
        const consultaNatureza = {
            url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/naturezas/INICIO_EXERCICIO/scripts?limit=20&offset=0",
            method : 'get',
            headers : headers
        }
        const objTag = [{"id" : tagId}]
        axios(consultaNatureza)
            .then(resp => {
                for(fase of resp.data.content){
                    if(fase.titulo.search(/2020/) !== -1) continue;
                    const vinculoTagFase = {
                        url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${fase.id}/tags`,
                        method : "put",
                        headers : headers,
                        data : objTag
                    }
                    axios(vinculoTagFase)
                        .then(resp => {
                            console.log(`[SUCESSO] -> TAG vinculada para a fase${resp.data.titulo}`)
                        })
                        .catch(err => console.log(err))
                    // break
                }
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

    // const axios = require('axios');
    // const fontesDados = require("./js/fontes-dados")

    // const headers = {
    //     'authorization' : fontesDados.tokenSuite,
    //     'user-access': 'w8PLKDmZcKPpJji6Wcf-cUFgPQoMSfw-FVh-Tz9H1v4='
    // }

    // const vinculoTagFase = {
    //     url : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/1289017/tags`,
    //     method : "put",
    //     headers : headers,
    //     data : [{"id" : 118847}]
    // }
    // axios(vinculoTagFase)
    //     .then(resp => {
    //         console.log(`[SUCESSO] -> TAG vinculada para a fase${resp.data.titulo}`)
    //     })
    //     .catch(err => console.log(err))
