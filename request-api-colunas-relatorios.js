// npm install axios => instar o axios por meio do node.
/*
* TODO : Script que vai pegar as colunas selecionadas de um relatório V1, e vai fazer em forma de campos mesmo,basta separarmos por virgula e colocar na consulta REST
*/
const fontesDados = require("./js/fontes-dados")
const axios = require('axios');
const base64 = require('base-64')
const exercicio = "{\"exercicio\":2020}";
const headers = {
    'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.token,
    'user-access': fontesDados.entidades.tabai
}
const parametros = {
    "limit" : 1, // podemos jogar uma paginação de até 10000
    "offset" : 0,
    "filter" : "vencimento.data >= 2020-01-01 and vencimento.data <= 2020-05-31 and entidade.id = 558"/*,
    "fields" : ""*/
}
const fonteDadosConsulta = {
    url : "https://plataforma-relatorios.betha.cloud/relatorios/v1/api/rascunhos/453289/componentes/685554/colunas" ,
    method: 'get',
    params: parametros,
    headers : headers/*,
    timeout : 20000 */
}
try{
    axios(fonteDadosConsulta)
        .then(resp => {
            for(it of resp.data){
                console.log(it.nome)
            }
        })

        .catch(err => console.log(`[ERRO] -> ${url} => ${err}`))
}catch(e){
    // console.log(`[ERRO] -> ${url.split('/')[url.split('/').length -1]}`)
    console.log(`[ERRO] -> ${url}`)
    console.log(e)
}