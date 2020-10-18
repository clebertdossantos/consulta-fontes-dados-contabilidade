// npm install axios => instar o axios por meio do node.
const axios = require('axios');

// for(it of [4204251,4208906]){ console.log(it)};
const listCode = [4204251,4208906]
// let ibge = 4204251
listCode.forEach(ibge => {
    const rgf = registro => registro.entregavel == 'Relatório de Gestão Fiscal';
    const parametros = {
        "id_ente" : ibge ,
        "an_referencia" : 2020 
    };
    console.log(parametros);
    // const url = "http://apidatalake.tesouro.gov.br/ords/siconfi/tt/"
    const url = "https://apidatalake.tesouro.gov.br/ords/siconfi/tt".concat("/extrato_entregas")
    const apiSICONFI = {
        url : url,
        method: 'get',
        params: parametros
    }
    console.log(">>>>>>>>>>>>>>>>>>>>   DADOS SICONFI   <<<<<<<<<<<<<<<<<<<<")
    console.log(`API : ${url}`)
    // const rgf = registro => registro.entregavel == 'Relatório de Gestão Fiscal' | registro.entregavel == 'Relatório Resumido de Execução Orçamentária' ;
    axios.get(url).then(resp => console.log(resp)).catch(err => console.log(err))
    // axios(apiSICONFI)
    // .then(resp => {
    //     for(it of resp.data.items.filter(rgf)){
    //          console.log(it);
    //         // console.log(JSON.stringify(it));
    //         break;
    //     }
    // })
    // .catch(err => console.log(err))
});
    