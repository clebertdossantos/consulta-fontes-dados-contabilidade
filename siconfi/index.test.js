const axios = require('axios');
const fs= require('fs');

const API_SICONFI = "https://apidatalake.tesouro.gov.br/ords/siconfi/tt/extrato_entregas"

// const criterio = (line) => {
//     switch (line.entregavel) {
//         case "Relatório de Gestão Fiscal": return line ; 
//         case "Relatório Resumido de Execução Orçamentária": return line ;
//     }
// }

const filtro_rreo = (line) => line.entregavel === "Relatório Resumido de Execução Orçamentária" 
const filtro_rgf = (line) => line.entregavel === "Relatório de Gestão Fiscal"
const config_municipio = []

async function extractApiSiconfi(){
    try{
        const parametros = {
            "an_referencia" : 2020 ,
            "id_ente" : 4204251,
            "offset" : 0 ,
            "limit" : 50000
        }
        const consult = {
            url : API_SICONFI ,
            method: 'get',
            params: parametros
        }
        const result = await axios(consult)
        var rgf = result.data.items.filter(filtro_rgf)[0]
        var rreo = result.data.items.filter(filtro_rreo)[0]
        config_municipio.push({
            "nome" : rgf.instituicao,
            "rreo" : {
                "tipo" : rreo.entregavel,
                "periodo" : rreo.periodicidade
            },
            "rgf" : {
                "tipo" : rgf.entregavel,
                "periodo" : rgf.periodicidade
            }
        })
    }catch(e){
        console.log(">>>>>>>>>>>>> ERROR <<<<<<<<<<<<<<");
        console.log(e)
    }
}

const entes_siconfi = async () => {
    const parametros_consulta = {
        "url" : "https://apidatalake.tesouro.gov.br/ords/siconfi/tt/extrato_entregas/entes",
        "method" : "get",
        "params" : {"limit" : 5000 , "offset" : 0}
    }
    const result = await axios(parametros_consulta)
    console.log(result.data)
}


(async () => {
    // {
    //     await entes_siconfi()
    // }

    {
        for (let index = 0; index < 1; index++) {
            const result = await extractApiSiconfi('xxxx')
        }
        console.log(config_municipio)
    }
})();
