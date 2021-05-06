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

const param_rreo = {
    "an_exercicio": 2020,
    "nr_periodo": 4,
    "co_tipo_demonstrativo": "RREO Simplificado",
    "no_anexo":"RREO-Anexo 03",
    "id_ente": 4215703
}


async function siconfiAPI(){
    const consulta = {
        "url" : utilitarios.urlSICONFI.rreo,
        "method" : "get",
        "params" :  param_rreo
    }
    try{
        const result = await axios(consulta)
        // console.log(result)
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