// npm install axios => instar o axios por meio do node.
const fontesDados = require("./js/fontes-dados")
const axios = require('axios');
const base64 = require('base-64')
const exercicio = "{\"exercicio\":2020}";
const headers = {
    'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.token,
    'user-access': fontesDados.entidades.cocaldosul
}
const parametros = {
    "limit" : 1, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const imprimir = (param) => `[${param.tipo}] -> ${param.url.split('/')[param.url.split('/').length -1]} => ${param.conteudo}`

function getConsultFontData(url) {
    return new Promise((resolve,reject) => {
        const fonteDadosConsulta = {
            url : url ,
            method: 'get',
            params: parametros,
            headers : headers/*,
            timeout : 20000 */
        }
        try{
            axios(fonteDadosConsulta)
                .then(resp => {
                    // console.log(resp);
                    if(resp.status == 200 || resp.status == 201){
                        resolve(imprimir({tipo : 'SUCESSO',url : url, conteudo : JSON.stringify(resp.data.content).substring(0,30)}))
                    }else{
                        reject(imprimir({tipo : 'ERRO',url : url, conteudo : JSON.stringify(resp.data.content)}))
                    }
                    // let fonteDados = resp.data.content;
                    // console.log(fonteDados);
                })
                // .catch(err => imprimir({tipo : 'ERRO',url : url}))
                // .catch(err => console.log(`[ERRO] -> ${url.split('/')[url.split('/').length -1]}`))
                .catch(err => console.log(`[ERRO] -> ${url} => ${err}`))
        }catch(e){
            // console.log(`[ERRO] -> ${url.split('/')[url.split('/').length -1]}`)
            console.log(`[ERRO] -> ${url}`)
            console.log(e)
        }
    });
}

for(it of fontesDados.temasFontesDados){
    getConsultFontData(it)
        .then(resp => Buffer.from(resp))
        // .then(resp => console.log(resp))
        .catch(err => console.log(err))
    // break;
}