const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const { exec } = require('child_process');
const total_registros = 10000
const limit = 500
console.log();
const paginacao = []
for(let i = 0 ; i <= (total_registros / limit) ; i++){
    paginacao.push(i*limit)
}

const fields = "id,tipo,numeroFormatado,nivel,descricao"
const filter = "exercicio.ano = 2020 and entidade.id = 32"

const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSistemas,
    'user-access': fontesDados.entidades.jaraguadosul
}


// async function servicoHTTP(params){
//     let nomeFonte = params.url.split('/')
//     nomeFonte = nomeFonte[nomeFonte.length-1]
//     // console.log(nomeFonte);
//     // console.log(params);
//     try{
//         axios(params)
//             .then(resp => {
//                 if(resp.data.content.length !== 0){
//                     console.log(`[SUCESSO] -> ${nomeFonte} | offset : ${params.params.offset} / limit : ${params.params.limit} -> Size : ${resp.data.content.length}`)
//                 }
//             })
//             .catch(err => {
//                 console.log(`[ERRO] -> ${params.url} => ${err} offset : ${params.params.offset} / limit : ${params.params.limit}`)
//             })
//     }catch(e){
//         console.log(`[ERRO] -> try / catch`)
//         console.log(e)
//     }
// }
// const executar = async function(){
//     count = 0
//     for(pag of paginacao){
//         const parametros = {
//             "timeout" : 180,
//             "limit" : limit, 
//             "offset" : (pag-limit),
//             "fields" : fields/*,
//             "filter" : filter*/
//         }
//         const fonteDadosConsulta = {
//             url : fontesDados.Dados.v1.contabil.recursos ,
//             method: 'get',
//             params: parametros,
//             headers : headers
//         }
//         if(pag === 0) continue;
//         await servicoHTTP(fonteDadosConsulta)
//         // console.log(`Pagina ${count++}`)
//     }
// }

// executar()

function getFontesDados(url) {
    return new Promise((resolve,reject) => {
        for(pag of paginacao){
            if(pag === 0) continue;
            let nomeFonte = url.split('/')
            nomeFonte = nomeFonte[nomeFonte.length-1]
            try{
                const parametros = {
                    "timeout" : 180,
                    "limit" : limit, 
                    "offset" : (pag-limit),
                    "fields" : fields/*,
                    "filter" : filter*/
                }
                const fonteDadosConsulta = {
                    url : url ,
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        if(resp.data.content.length !== 0){
                            console.log(`[SUCESSO] -> ${nomeFonte} | offset : ${parametros.offset} / limit : ${parametros.limit} -> Size : ${resp.data.content.length}`)
                        }
                    })
                    .catch(err => {
                        console.log(`[ERRO] -> ${url} => ${err} offset : ${parametros.offset} / limit : ${parametros.limit}`)
                    })
            }catch(e){
                console.log(`[ERRO] -> try / catch`)
                console.log(e)
            }
            // break;
        }
    });
}



getFontesDados(fontesDados.Dados.v1.contabil.recursos)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))

