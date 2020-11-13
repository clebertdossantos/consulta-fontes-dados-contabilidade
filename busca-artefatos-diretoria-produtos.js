const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : "Bearer eb1097e3-5973-4917-9db1-df1573ffb3da",
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
                parametros.limit = pag 
                parametros.offset = (pag - 100)
                const fonteDadosConsulta = {
                    url : url ,
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        // console.log(resp.data.content);
                        for (const iterator of resp.data.content) {
                            // console.log(iterator.id)
                            axios({
                                url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/".concat(iterator.id),
                                method: 'get',
                                params: parametros,
                                headers : headers
                            })
                                .then(aux => {
                                    let identificador = url.split('/')
                                    identificador = identificador[identificador.length -1]
                                    // if()
                                    // console.log(aux.data.revisao.codigoFonte)
                                    let n = aux.data.revisao.codigoFonte.search(/Dados.contabilidade.v1.movimentacaoContabilEmpenho/);
                                    if(n != -1){
                                        console.log(`${identificador} >> ${aux.data.titulo}`)
                                    }
                                    // console.log(aux.data.titulo)
                                })
                                .catch(err => console.log(err))
                            // break
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
    // "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas",
]){
    getConsultFontData(it)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    //  break;
}
