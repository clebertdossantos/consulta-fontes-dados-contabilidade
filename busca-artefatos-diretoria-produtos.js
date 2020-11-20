const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')
const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : "Bearer 21be9b93-1712-47c0-9378-fb30caa1f624",
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
                        // console.log(resp.data);
                        // console.log(`offset : ${resp.data.offset} | limit : ${resp.data.limit} | total : ${resp.data.total} `);
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
                                    let ok = aux.data.revisao.codigoFonte.search(/6221304/)
                                    let not = aux.data.titulo.search(/Descontinuado|desk|DEMO/)
                                    if(ok != -1 && not === -1){
                                        console.log(aux.data.titulo)
                                        // console.log(__dirname + `/file-busca-artefatos/${(aux.data.titulo.replace('/',' - ')).replace('/',' - ')}.groovy`)
                                        fs.writeFileSync(__dirname + `/file-busca-artefatos/[${identificador}] - ${(aux.data.titulo.replace('/',' - ')).replace('/',' - ')}.groovy` , aux.data.revisao.codigoFonte.toString())
                                    }
                                    // if(aux.data.titulo === 'Fonte Dinâmica - Anexo 14 - Balanço Patrimonial'){
                                    //     console.log(__dirname + `/file-busca-artefatos/${aux.data.titulo}.groovy`)
                                    //     fs.writeFileSync(__dirname + `/file-busca-artefatos/${aux.data.titulo}.groovy` , aux.data.revisao.codigoFonte)
                                    // }
                                })
                                .catch(err => console.log(err))
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

try{
    fs.mkdirSync('./file-busca-artefatos')
}catch(e){
    console.log('[AVISO] >> Pasta já existe!!!')
}

for(it of [
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/componentes",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts",
]){
    getConsultFontData(it)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    // break;
}
