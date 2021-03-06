const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');

const parametros_execucao = {
    "regex" : "CODIGO", // TITULO,TAG,CODIGO,NATUREZA
    "tagId" : 17789,
    "natureza" : "TRANSPARENCIA_FLY",
    "regexCodigo" : /movimentacoes\.financeiras/,
    "regexTitulo" : /SC-2020/
}
console.log(parametros_execucao);

const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos_contabil
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const imprimir = (param) => `[${param.tipo}] -> ${param.url.split('/')[param.url.split('/').length -1]} => ${param.conteudo}`

function getConsultFontData(url) {
    return new Promise((resolve,reject) => {
        for(pag of [100,200,300,400,500,600,700,800,900]){
            try{
                parametros.limit = 100 
                parametros.offset = (pag - 100)
                const fonteDadosConsulta = {
                    url : url ,
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        for (const iterator of resp.data.content) {
                            axios({
                                url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/".concat(iterator.id),
                                method: 'get',
                                params: parametros,
                                headers : headers
                            })
                            .then(aux => {
                                    let identificador = url.split('/')
                                    identificador = identificador[identificador.length -1]
                                    let ok = -1
                                    let not = aux.data.titulo.search(/Descontinuado|desk|DEMO/)
                                    switch(parametros_execucao.regex) {
                                        case "CODIGO":
                                            ok = aux.data.revisao.codigoFonte.search(parametros_execucao.regexCodigo)
                                            break;
                                        case "TITULO":
                                            ok = aux.data.titulo.search(parametros_execucao.regexTitulo)
                                            break;
                                        case "TAG":
                                            console.log(aux.data.titulo)
                                            fs.writeFileSync(__dirname + `/file-busca-artefatos/[${identificador}] - ${(aux.data.titulo.replace('/',' - ')).replace('/',' - ').replace(':','-').substring(0,170)}.groovy` , aux.data.revisao.codigoFonte.toString())
                                            break;
                                        case "NATUREZA":
                                            console.log(aux.data.titulo)
                                            fs.writeFileSync(__dirname + `/file-busca-artefatos/[${identificador}] - ${(aux.data.titulo.replace('/',' - ')).replace('/',' - ').replace(':','-').substring(0,170)}.groovy` , aux.data.revisao.codigoFonte.toString())
                                            break;
                                        default:
                                            console.log("[ERRO] -> Não teve como cair nas condições do switch");
                                            break;
                                    }
                                    if(ok != -1 && not === -1){
                                        console.log(aux.data.titulo)
                                        fs.writeFileSync(__dirname + `/file-busca-artefatos/[${identificador}] - ${(aux.data.titulo.replace('/',' - ')).replace('/',' - ').replace(':','')}.groovy` , aux.data.revisao.codigoFonte.toString())
                                    }
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
    // console.log('[AVISO] >> Pasta já existe!!!')
}

for(it of [
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/componentes",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas",
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/criticas"
]){
    let newIt = it
    let array = it.split('/')
    if(parametros_execucao.regex === "TAG"){
        newIt = []
        for(i of array){
            if(array[array.length -1] === "scripts"){
                newIt.push(i)
                if(i === "api"){
                    newIt.push('tags')
                    newIt.push(parametros_execucao.tagId)
                }
            }else{
                newIt.push(i)
                if(i === "componentes" || i === "fontes-dinamicas"){
                    newIt.push('tags')
                    newIt.push(parametros_execucao.tagId)
                    newIt.push('scripts')
                }
            }
        }
        newIt = newIt.join('/')
    }else{
        if(parametros_execucao.regex === "NATUREZA"){
            newIt = [] 
            if(array[array.length -1] === "scripts"){
                for(i = 0 ; i < array.length ; i++){
                    if(i === 5){
                        newIt.push(array[i])
                        newIt.push('naturezas')
                        newIt.push(`${parametros_execucao.natureza}`)
                    }else{
                        newIt.push(array[i])
                    }
                }
            }else{
                continue;
            }
            newIt = newIt.join('/')
        }
    }
    console.log(newIt);
    getConsultFontData(newIt)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}