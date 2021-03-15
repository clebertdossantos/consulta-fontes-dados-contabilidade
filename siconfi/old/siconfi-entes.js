// npm install axios => instar o axios por meio do node.
const axios = require('axios');

// for(it of [4204251,4208906]){ console.log(it)};

// let ibge = 4204251
// const url = "http://apidatalake.tesouro.gov.br/ords/siconfi/tt/"
const url = "https://apidatalake.tesouro.gov.br/ords/siconfi/tt".concat("/entes")
const apiSICONFI = {
    url : url,
    method: 'get'
}
console.log(">>>>>>>>>>>>>>>>>>>>   DADOS SICONFI   <<<<<<<<<<<<<<<<<<<<")
console.log(`API : ${url}`)
// const rgf = registro => registro.entregavel == 'Relatório de Gestão Fiscal' | registro.entregavel == 'Relatório Resumido de Execução Orçamentária' ;
axios.get(url)
    .then(resp => {
        console.log(resp.data.items.length);
        for(it of resp.data.items) console.log(JSON.stringify(it));
    })
    .catch(err => console.log(err))
