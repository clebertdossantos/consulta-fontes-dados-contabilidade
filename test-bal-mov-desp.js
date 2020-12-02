const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')
const total_registros = 10000
const limit = 500
console.log();
const paginacao = []
for(let i = 0 ; i <= (total_registros / limit) ; i++){
    paginacao.push(i*limit)
}
const meses = [1,2,3,4,5,6,7,8,9,10,11,12]

// const fields = "exercicio.ano,entidade.id,despesa.id,despesa.acao.numero,despesa.acao.descricao,despesa.organograma.id,despesa.funcao.id,despesa.subfuncao.id,despesa.numero,despesa.natureza.id,recurso.id,empenho.id,valorPrevisto,valorAlteracao,valorBloqueado,valorEmpenhado,valorLiquidado,valorPago,mes,empenho.numeroCadastro.numero,empenho.natureza.id,empenho.credor.nome"
const fields = "id"
const filter = "exercicio.ano = 2020 and entidade.id = 32"

const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSistemas,
    'user-access': fontesDados.entidades.jaraguadosul
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function getFontesDados(url) {
    return new Promise((resolve) => {
        for(mes of meses){
            for(pag of paginacao){
                if(pag === 0) continue;
                let nomeFonte = url.split('/')
                nomeFonte = nomeFonte[nomeFonte.length-1]
                try{
                    const parametros = {
                        "timeout" : 180,
                        "limit" : limit, 
                        "offset" : (pag-limit),
                        "fields" : fields,
                        "filter" : filter.concat(` and mes = ${mes}`)
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
                                console.log(`[SUCESSO] -> ${nomeFonte} | ${parametros.filter} -> Size : ${resp.data.content.length}`)
                            }
                        })
                        .catch(err => {
                            console.log(`[ERRO 1] -> ${nomeFonte} | ${parametros.filter} offset : ${parametros.offset} / limit : ${parametros.limit} => ${err}`)
                            // for(idx of [2,3,4,5]){
                            //     let aux = false
                            //     sleep(10000)
                            //     .then(() =>
                            //         axios(fonteDadosConsulta)
                            //         .then(resp => {
                            //             if(resp.data.content.length !== 0){
                            //                 console.log(`[SUCESSO] -> ${nomeFonte} | ${parametros.filter} -> Size : ${resp.data.content.length}`)
                            //                 aux = true
                            //             }
                            //         })
                            //         .catch(err => {
                            //             console.log(`[ERRO ${idx}] -> ${nomeFonte} | ${parametros.filter} offset : ${parametros.offset} / limit : ${parametros.limit} => ${err}`)
                            //         }) )
                            //     .catch(err => console.log('DEU RUIM'))                           
                            //     if(aux) break ;
                            // }
                        })
                }catch(e){
                    console.log(`[ERRO] -> try / catch`)
                    console.log(e)
                }
                //  break;
            }
            // break;
        }
    });
}



getFontesDados(fontesDados.Dados.v1.contabil.movimentacaoBalanceteMensalDespesa)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))

