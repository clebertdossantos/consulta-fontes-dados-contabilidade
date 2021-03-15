const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const fases = require('./js/fases-encerramento');
const { resolve } = require('path');
const { DefaultSerializer } = require('v8');

const headers = {
    'authorization' :'Bearer f4cd1bf4-aad4-42f3-aeaa-fa5c0b02aa2f' ,
    'user-access': 'uX0-gla5eVE9xLFfMHOlFc8o3JVS_hGwcbCk0170BiU='
}

let obj = {
    "nome":"_SICONFI RREO 2021"
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
                url : 'https://plataforma-scripts.betha.cloud/scripts/v1/api/componentes?(titulo like "%25SICONFI%20-%20RREO%202021%25" or identificador like "%25SICONFI%20-%20RREO%202021%25")',
                method : 'get',
                headers : headers                
            }
            const objTag = [{"id" : tagId}]
            axios(consultaNatureza)
                .then(resp => {
                    console.log(resp);
                    for(fase of resp.data.content){
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
