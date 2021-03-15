const axios = require('axios')
const utilitarios = require('./siconfi-auxiliar')

const parametros = {
    "limit" : 5000,
    "offset" : 0,
    "id_ente" : 4204251,
    "an_referencia" : 2020
}
const param_rgf = {
    "an_exercicio" : 2020,
    "in_periodicidade" : 'Q',
    "nr_periodo" : 1,
    "co_tipo_demonstrativo" : 'RGF',
    "no_anexo" : 'RGF-Anexo 01',
    "co_poder" : 'E',
    "id_ente" : 4204251
}


async function siconfiAPI(){
    const consulta = {
        "url" : utilitarios.urlSICONFI.rgf,
        "method" : "get",
        "params" :  param_rgf
    }
    try{
        const result = await axios(consulta)
        // console.log(result.data.items)
        for(idx of result.data.items){
            let ln = Object.values(idx)
            ln[12] = ln[12].replace(',',' ').replace(',',' ').replace(',',' ').replace(',',' ')
            ln = ln.join(',')
            console.log(ln)
            // break;
        }
    }catch(e){
        console.log('>>>>>> ERRO <<<<<<')
        console.log(e)
    }
}

siconfiAPI()