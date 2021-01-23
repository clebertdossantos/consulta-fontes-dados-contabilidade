const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fases = require("./js/fases-encerramento")
const fs= require('fs')

const headers = {
    'App-Context': "eyJleGVyY2ljaW8iOjIwMjB9",
    'authorization' : "Bearer d4fc588c-4939-4d17-b927-10b178fa8d14",
    'user-access': "1Smx2QtX7wQ="
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}

const plano_contas = 3295

const name = {nome : ""}
const ft = (it) => it.descricao === name.nome
const configFaseItens = []

function getConsultFontData(nome) {
    return new Promise((resolve,reject) => {
            try{
                const fonteDadosConsulta = {
                    // url : 'https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts',
                    // url : 'https://esc-api-rest.test.bethacloud.com.br/escrituracao/api/configuracoes-planos-contas/uso',                           
                    url : `https://esc-api-rest.test.bethacloud.com.br/escrituracao/api/configuracoes-planos-contas/${plano_contas}/fases`,  
                    method: 'get',
                    params: parametros,
                    headers : headers
                }
                axios(fonteDadosConsulta)
                    .then(resp => {
                        for(idx of resp.data.content.filter((it)=> it.tipo.value === "E" )){ // TODO : filtar somente o que é encerramento
                           name.nome = idx.descricao.replace(' - PR','')
                           result = fases.configFaseDadosPR.filter(ft)
                            let json = {
                                "predecessoras": result[0].predecessora,
                                "fase": {
                                    "id": idx.id,
                                    "descricao": idx.descricao,
                                    "tipo": {
                                        "key": "LANCAMENTO_ENCERRAMENTO",
                                        "value": "E",
                                        "description": "Lançamento de encerramento"
                                    },
                                    "idScript": idx.idScript
                                },
                                "sequencia": result[0].sequencia
                            }
                            configFaseItens.push(json)
                        }
                    })
                    .then(resp => {
                        const json_envio = {
                            "descricao": "Encerramento do Exercício - 2020",
                            "processo": {
                                "key": "ENCERRAMENTO_EXERCICIO"
                            },
                            "itens": configFaseItens.sort(function (a, b) {
                                if (a.sequencia > b.sequencia) {
                                  return 1;
                                }
                                if (a.sequencia < b.sequencia) {
                                  return -1;
                                }
                                // a must be equal to b
                                return 0;
                              })
                        }
                        axios({
                            "url" : `https://esc-api-rest.test.bethacloud.com.br/escrituracao/api/configuracoes-planos-contas/${plano_contas}/configuracoes-fases`,
                            "method" : 'post',
                            "data" : json_envio,
                            "headers" : headers
                        })
                        .then(resp => console.log('[SUCESSO] -> ',resp.data))
                        .catch(err => console.log('[ERRO] -> Não foi possivel inserir uma configuração das fases de encerramento :',idx.titulo,err))
                    })
                    .catch(err => console.log(`[ERRO] -> Nº 2  ${nome} => ${err}`))
            }catch(e){
                console.log(`[ERRO] -> Nº1 ${url}`)
                console.log(e)
            }
    });
}


// for (let index = 0; index < fase.length; index++) {
    // getConsultFontData(fase[index])
    getConsultFontData()
        // .then(resp => Buffer.from(resp))
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
        // break;
// }


// "Encerramento da Execução de Subempenhos (conta corrente '7-Empenho' (e-Sfinge)) "
// "Inscrição de Restos a Pagar do exercício  - Parte 1"
// "Inscrição de Restos a Pagar do exercício  - Parte 2"
// "Encerramento da Execução de Restos a Pagar "
// "Repasse de Restos a Pagar do exercício para exercícios anteriores "
// "Encerramento da Despesa Orçamentária "
// "Encerramento da Receita Orçamentária "
// "Repasse de Resultado Patrimonial do exercício para exercícios anteriores "
// "Apuração do Resultado Patrimonial do exercício "
// "Encerramento da Execução dos Grupos de Controle "
