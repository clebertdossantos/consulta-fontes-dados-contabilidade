// npm install axios => instar o axios por meio do node.
const fontesDados = require("./js/fontes-dados")
const axios = require('axios');
const base64 = require('base-64')
const exercicio = "{\"exercicio\":2020}";
const headers = {
    'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSistemas,
    'user-access': fontesDados.entidades.cocaldosul
}   
const parametros = {
    "limit" : 1, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const imprimir = (param) => `[${param.tipo}] -> ${param.url.split('/')[param.url.split('/').length -1]} => ${param.conteudo}`
var contador = 0
const tamanho = fontesDados.temasFontesDados.length

async function getConsultFontData(url) {
    const fonteDadosConsulta = {
        url : url ,
        method: 'get',
        params: parametros,
        headers : headers/*,
        timeout : 20000 */
    }
    try{
        const result = await axios(fonteDadosConsulta)
        contador++
        console.log( `[${contador}/${tamanho}] [SUCESSO] -> ${url.split('/')[url.split('/').length -1]} => ${JSON.stringify(result.data.content).substring(0,30)}`)
    }catch(e){  
        // imprimir({tipo : 'ERRO',url : url, conteudo : JSON.stringify(result.data.content)})
        contador++
        console.log(`[${contador}/${tamanho}] [ERRO] -> ${url}`)
    }
}

(async () => {
    for (let index = 0; index < fontesDados.temasFontesDados.length; index++) {
        await getConsultFontData(fontesDados.temasFontesDados[index])
    }
})();

