const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');

const parametros_execucao = {
    "regex" : "TAG",
    "acao" : "COPIAR",
    "tagId" : 118784 ,
    "tagDestino" : [{
        "entidadeId": 3890,
        "id": 118692,
        "nome": "Encerramento Exercício 2020 - MG",
        "sistemaId": 68
      }], // Encerramento PR
      "urlScriptTest" : "https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos"
}

const headers = {
    'authorization' : fontesDados.tokenSuite,
    'user-access': fontesDados.entidades.diretoriadeprodutos
}

const headers_post_test = {
    "authorization": fontesDados.tokenTesteSuite,
    // "user-access": fontesDados.entidadesTeste.lajegadoGrandeClau,
    "user-access": "R6zLEQoqJeMrByGcvLnRepiXWhb4LJxQ",
}
const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const imprimir = (param) => `[${param.tipo}] -> ${param.url.split('/')[param.url.split('/').length -1]} => ${param.conteudo}`

async function getConsultFontData(url) {
    return new Promise((resolve,reject) => {
        for(pag of [100,200,300,400]){
            try{
                parametros.limit = 100 
                parametros.offset = (pag - 100)
                const fonteDadosConsulta = {
                    url : url ,
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                // console.log(fonteDadosConsulta)
                axios(fonteDadosConsulta)
                    .then(resp => resp.data.content)
                    .then(obj => { 
                        if(obj.length == 0){
                            return false
                        }
                        for(idx of obj){
                            axios({
                                url : "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/".concat(idx.id),
                                method: 'get',
                                params: parametros,
                                headers : headers
                            })
                            .then(resp_script => { // verifica se existe parametros
                                const retorno_script = resp_script.data
                                if(fonteDadosConsulta.url.search(~/componentes/) !== -1){
                                    return retorno_script
                                }else{
                                    // if(fontesDados.temasFontesDados.url.split('/')[fontesDados.temasFontesDados.url.split('/').length -1])
                                    if(JSON.stringify(retorno_script) === JSON.stringify({}) ) return {} ;
                                    axios({
                                        "url" : `https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts/${retorno_script.id}/revisoes/${retorno_script.revisao.id}/parametros`,
                                        "method" : "get",
                                        "headers" : headers
                                    })
                                    .then(resp_parametros => {
                                        const script_parametros = resp_parametros.data
                                        let json_rascunho = {
                                            "eventos" : retorno_script.eventos,
                                            "titulo" : retorno_script.titulo,
                                            "chaveNatureza" : retorno_script.chaveNatureza,
                                            "tags" : [],
                                            "tipoScript" : {
                                                "value" : retorno_script.tipo.value // TODO : Criar uma constando para informar o tipo do script, critica, componente ou fonte finamica
                                            },
                                            "disponivelConsulta" : retorno_script.disponivelConsulta
                                        }
                                        // console.log(retorno_script)
                                        // console.log(json_rascunho)
                                        axios({
                                            "url" : parametros_execucao.urlScriptTest,
                                            "method": 'post',
                                            "headers" : headers_post_test,
                                            "data" : json_rascunho
                                        })
                                        .then(resp => { // criação do rascunho
                                            return resp.data
                                        })
                                        .then(rascunho_criado => {
                                            // console.log(rascunho_criado)
                                            // console.log('>>>>> COPIA <<<<<')
                                            // console.log('Script : ',rascunho_criado.titulo)
                                            // console.log(script_parametros)
                                            if(JSON.stringify(script_parametros) !== JSON.stringify({})){ // cria os parametros no test caso o script possua
                                                for (let index = 0; index < script_parametros.length; index++) {
                                                    let param_prod = script_parametros[index]
                                                    let json_parametro = {
                                                        "nome": param_prod.nome,
                                                        "descricao": param_prod.descricao,
                                                        "obrigatorio": param_prod.obrigatorio,
                                                        "habilitado": param_prod.habilitado,
                                                        "visivel": param_prod.visivel,
                                                        "tipo": {
                                                            "value": param_prod.tipo.value
                                                        },
                                                        "tipoOpcoesLista": param_prod.tipoOpcoesLista,
                                                        "listaOpcoes": param_prod.listaOpcoes,
                                                        "rascunho": {
                                                            "id": rascunho_criado.id
                                                        },
                                                        "ordem": param_prod.ordem
                                                    }
                                                    // console.log(json_parametro);
                                                    axios({
                                                        "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                        "method" : "post",
                                                        "data" : json_parametro,
                                                        "headers" : headers_post_test
                                                    })
                                                    .then(resp => resp )
                                                    // .then(resp => console.log(' params => ',resp.data.nome) )
                                                    .catch(err =>{
                                                        console.log(` [ERRO] 1 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`)
                                                        axios({ // retentando novamente inserir um parametro caso tenha dado erro...
                                                            "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                            "method" : "post",
                                                            "data" : json_parametro,
                                                            "headers" : headers_post_test
                                                        })
                                                        .then(resp => console.log(' params => ',resp.data.nome) )
                                                        .catch(err => { 
                                                            console.log(`[ERRO] 2 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`)
                                                            axios({ // retentando novamente inserir um parametro caso tenha dado erro...
                                                                "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                                "method" : "post",
                                                                "data" : json_parametro,
                                                                "headers" : headers_post_test
                                                            })
                                                            .then(resp => console.log(' params => ',resp.data.nome) )
                                                            .catch(err => { 
                                                                console.log(`[ERRO] 3 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`)
                                                                axios({ // retentando novamente inserir um parametro caso tenha dado erro...
                                                                    "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                                    "method" : "post",
                                                                    "data" : json_parametro,
                                                                    "headers" : headers_post_test
                                                                })
                                                                .then(resp => console.log(' params => ',resp.data.nome) )
                                                                .catch(err => { 
                                                                    console.log(`[ERRO] 4 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`)
                                                                    axios({ // retentando novamente inserir um parametro caso tenha dado erro...
                                                                        "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                                        "method" : "post",
                                                                        "data" : json_parametro,
                                                                        "headers" : headers_post_test
                                                                    })
                                                                    .then(resp => console.log(' params => ',resp.data.nome) )
                                                                    .catch(err => { 
                                                                        console.log(`[ERRO] 5 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`)
                                                                        axios({ // retentando novamente inserir um parametro caso tenha dado erro...
                                                                            "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado.id}/parametros`,
                                                                            "method" : "post",
                                                                            "data" : json_parametro,
                                                                            "headers" : headers_post_test
                                                                        })
                                                                        .then(resp => console.log(' params => ',resp.data.nome) )
                                                                        .catch(err =>console.log(`[ERRO] 6 -> Erro ao criar um parametro para o script ${script_parametros.titulo} , parametro : ${json_parametro.nome} / ${err}`))
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                }
                                                return rascunho_criado
                                            }else{
                                                return {}
                                            }
                                        })
                                        .then(rascunho_criado_parametros => {
                                            if(JSON.stringify(rascunho_criado_parametros) !== JSON.stringify({})){
                                                setTimeout(() =>{
                                                    axios({
                                                        "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/parametros`,
                                                        "method" : "get",
                                                        "headers" : headers_post_test
                                                    }).then(set_param => {
                                                        const retorno_parametros = set_param.data
                                                        let parametros_rascunho = []
                                                        if(JSON.stringify(rascunho_criado_parametros) !== JSON.stringify({})){
                                                            for(line of retorno_parametros){
                                                                parametros_rascunho.push({
                                                                    "descricao" : line.descricao ,
                                                                    "id" : line.id
                                                                })
                                                            }
                                                        }   
                                                        // console.log(parametros_rascunho);      
                                                        let json_rascunho_put = {
                                                            "id": rascunho_criado_parametros.id,
                                                            "revisao":rascunho_criado_parametros.revisao,
                                                            "entidadeId":rascunho_criado_parametros.entidadeId,
                                                            "sistemaId":rascunho_criado_parametros.sistemaId,
                                                            "titulo":rascunho_criado_parametros.titulo,
                                                            "descricao":rascunho_criado_parametros.descricao,
                                                            "chaveNatureza":rascunho_criado_parametros.chaveNatureza,
                                                            "disponivelConsulta":rascunho_criado_parametros.disponivelConsulta,
                                                            "descricaoNatureza":rascunho_criado_parametros.descricaoNatureza,
                                                            "codigoFonte":retorno_script.revisao.codigoFonte,
                                                            "tags": [],
                                                            "parametros": parametros_rascunho,
                                                            "version": rascunho_criado_parametros.version,
                                                            "tipoScript": {
                                                                "value": rascunho_criado_parametros.tipoScript.value,
                                                                "description": rascunho_criado_parametros.tipoScript.description
                                                            },
                                                            "eventos": rascunho_criado_parametros.eventos,
                                                            "execucaoEventoAssincrono": rascunho_criado_parametros.execucaoEventoAssincrono
                                                        }
                                                        // console.log(json_rascunho_put)  
                                                        axios({
                                                            "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}`,
                                                            "method" : "put",
                                                            "headers" : headers_post_test,
                                                            "data" : json_rascunho_put
                                                        })
                                                        .then(resp_put_rascunho => {
                                                            // console.log(resp_put_rascunho)
                                                            const data_post = {}
                                                            axios({
                                                                "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/acoes/publicar`,
                                                                "method" : "post",
                                                                "headers" : headers_post_test,
                                                                "data" : data_post
                                                            })
                                                            .then(resp_post_rascunho => {
                                                                console.log(`[SUCESSO] -> Orquestração concluída : ${resp_post_rascunho.data.titulo}`)
                                                            })  
                                                            .catch(err =>{ 
                                                                console.log(`[ERRO] 1 -> Erro ao publicar o rascunho / ${err} - ${retorno_script.titulo}` )
                                                                axios({
                                                                    "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/acoes/publicar`,
                                                                    "method" : "post",
                                                                    "headers" : headers_post_test,
                                                                    "data" : data_post
                                                                })
                                                                .then(resp_post_rascunho => {
                                                                    console.log(`[SUCESSO] -> Orquestração concluída : ${resp_post_rascunho.data.titulo}`)
                                                                })
                                                                .catch(err =>{ 
                                                                    console.log(`[ERRO] 2 -> Erro ao publicar o rascunho / ${err} - ${retorno_script.titulo}`)
                                                                    axios({
                                                                        "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/acoes/publicar`,
                                                                        "method" : "post",
                                                                        "headers" : headers_post_test,
                                                                        "data" : data_post
                                                                    })
                                                                    .then(resp_post_rascunho => {
                                                                        console.log(`[SUCESSO] -> Orquestração concluída : ${resp_post_rascunho.data.titulo}`)
                                                                    })
                                                                    .catch(err => console.log(`[ERRO] 3 -> Erro ao publicar o rascunho / ${err} - ${retorno_script.titulo}`))
                                                                })
                                                            })
                                                        })
                                                        .catch(err => {
                                                            console.log(`[ERRO] 1 -> Erro ao atualizar o rascunho com código fonte / ${err}`)
                                                            const data_post = {}
                                                            axios({
                                                                "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/acoes/publicar`,
                                                                "method" : "post",
                                                                "headers" : headers_post_test,
                                                                "data" : data_post
                                                            })
                                                            .then(resp_post_rascunho => {
                                                                console.log(`[SUCESSO] -> Orquestração concluída : ${resp_post_rascunho.data.titulo}`)
                                                            })
                                                            .catch(err => console.log(`[ERRO] 3 -> Erro ao publicar o rascunho / ${err}`))
                                                        })
                                                    })
                                                    .catch(err => console.log(`[ERRO] -> Erro ao consultar os parametros / ${err}`))
                                                },2000)
                                            }
                                        })
                                        .catch(err => console.log(`[ERRO] -> Erro na criação do rascunho ${idx.titulo} / ${err}`))
                                    })
                                    .catch(err => console.log(`[ERRO] -> Erro ao consultar os parametros ${err}`))
                                    return retorno_script
                                }
                            })
                            .then(retorno_script => { // descomentar quando tivermos que orquestrar componentes...
                                let json_rascunho = {
                                    "eventos" : retorno_script.eventos,
                                    "titulo" : retorno_script.titulo,
                                    "chaveNatureza" : retorno_script.chaveNatureza,
                                    "tags" : [],
                                    "tipoScript" : {
                                        "value" : retorno_script.tipo.value // TODO : Criar uma constando para informar o tipo do script, critica, componente ou fonte finamica
                                    },
                                    "disponivelConsulta" : retorno_script.disponivelConsulta
                                }
                                axios({
                                    "url" : parametros_execucao.urlScriptTest,
                                    "method": 'post',
                                    "headers" : headers_post_test,
                                    "data" : json_rascunho
                                })
                                .then(resp => { // criação do rascunho
                                    return resp.data
                                })
                                .then(rascunho_criado_parametros => {
                                    if(JSON.stringify(rascunho_criado_parametros) !== JSON.stringify({})){
                                        setTimeout(() =>{        
                                                let json_rascunho_put = {
                                                    "id": rascunho_criado_parametros.id,
                                                    "revisao":rascunho_criado_parametros.revisao,
                                                    "entidadeId":rascunho_criado_parametros.entidadeId,
                                                    "sistemaId":rascunho_criado_parametros.sistemaId,
                                                    "titulo":rascunho_criado_parametros.titulo,
                                                    "descricao":rascunho_criado_parametros.descricao,
                                                    "chaveNatureza":rascunho_criado_parametros.chaveNatureza,
                                                    "disponivelConsulta":rascunho_criado_parametros.disponivelConsulta,
                                                    "descricaoNatureza":rascunho_criado_parametros.descricaoNatureza,
                                                    "codigoFonte":retorno_script.revisao.codigoFonte,
                                                    "tags": [],
                                                    "parametros": [],
                                                    "version": rascunho_criado_parametros.version,
                                                    "tipoScript": {
                                                        "value": rascunho_criado_parametros.tipoScript.value,
                                                        "description": rascunho_criado_parametros.tipoScript.description
                                                    },
                                                    "eventos": rascunho_criado_parametros.eventos,
                                                    "execucaoEventoAssincrono": rascunho_criado_parametros.execucaoEventoAssincrono
                                                }
                                                // console.log(json_rascunho_put)  
                                                axios({
                                                    "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}`,
                                                    "method" : "put",
                                                    "headers" : headers_post_test,
                                                    "data" : json_rascunho_put
                                                })
                                                .then(resp_put_rascunho => {
                                                    // console.log(resp_put_rascunho)
                                                    const data_post = {}
                                                    axios({
                                                        "url" : `https://plataforma-scripts.test.betha.cloud/scripts/v1/api/rascunhos/${rascunho_criado_parametros.id}/acoes/publicar`,
                                                        "method" : "post",
                                                        "headers" : headers_post_test,
                                                        "data" : data_post
                                                    })
                                                    .then(resp_post_rascunho => {
                                                        console.log(`[SUCESSO] -> Orquestração concluída : ${resp_post_rascunho.data.titulo}`)
                                                    })  
                                                    .catch(err => console.log(`[ERRO] -> Erro ao publicar o rascunho / ${err}`))
                                                })
                                                .catch(err => console.log(`[ERRO] -> Erro ao atualizar o rascunho com código fonte / ${err}`))
                                        },2000)
                                    }
                                })
                                .catch(err => console.log(`[ERRO] -> Erro na criação do rascunho ${idx.titulo} / ${err}`))
                                return retorno_script   
                            })
                            .catch(err => console.log(`[ERRO] -> Erro ao consultar o script ${idx.titulo} : ${err}`))
                            //break;
                        }
                    })
                    .then(resp => console.log(resp))
                    .catch(err => console.log(`[ERRO] -> ${url} => ${err}`))
            }catch(e){
                console.log(`[ERRO] -> ${url}`)
                console.log(e)
            }
        }
    });
}

for(it of [
    "https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts",
    // "https://plataforma-scripts.betha.cloud/scripts/v1/api/componentes",
    // "https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas",
]){
    let newIt = it
    if(parametros_execucao.regex === "TAG"){
        let array = it.split('/')
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
    }
    console.log(newIt)
    getConsultFontData(newIt)
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
}
// https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas/tags/191261/scripts
// https://plataforma-scripts.betha.cloud/scripts/v1/api/fontes-dinamicas/tags/191261/scripts