const axios = require('axios');

// const headers = {
//     'app-context': 'eyJleGVyY2ljaW8iOjIwMjF9',
//     'authorization': 'Bearer 86c47c18-ee14-40c8-99fc-a99b6c668e80',
//     'user-access': 'jE77F3qcpMs='
// }


//  axios({
//     "url" : `https://esc-api-rest.cloud.betha.com.br/escrituracao/api/configuracoes-planos-contas/4641/saldos-iniciais-itens?filter=&limit=100&offset=0`,
//     "method" : "get",
//     "headers" : headers
// })
// .then(resp => {
    
//     for(it of resp.data.content) {
//         console.log(it.idSubdocumentoCPC)
//     }
// })
// .catch(err => console.log(err))





for(it of [7811766,7811767,7811796,7811814,7811815,7811816,7811817,7811818,7811820,7811822,7811824,7811825,7811826,7811827,7811828,7811829,7811830,7811831,7811832,7811833,7811834,7811835,7811836,7811837,7811838,7811839,7811840,7811841,7811842,7811843,7811844,7811845,7811846,7811847,7811848,7811849,7811850,7811851,7811852,7811853,7811854,7811855,7811856,7811858,7811857,7811859,7811860,7811861,7811862,7811863,7811865,7811864,7811866,7811867,7811868,7811869,7811870,7811871,7811872,7811873,7811874,7811875]){
    const url = 'http://search-els-contabil-p67yhmjndgcc7y5s2wgg2qj7nq.sa-east-1.es.amazonaws.com/escrituracao-documento-historico/escrituracaoDocumentoHistorico/_search'
    const headers = {
        'Content-Type' : 'application/json'
    }    
    const data = {
        "query": {
            "bool": {
            "must": [
                {
                "term": {
                    "documentoEscrituracao.id": it
                }
                }
            ]
            }
        }
    }

    axios({
        'method' : 'post',
        'data' : data ,
        'headers' : headers,
        'url' : url
    })
    .then(resp => {
        console.log(resp.data.hits.hits[0]._source.inconsistencias)
    })
    .catch(err => console.log(err))
}

