const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs')

const headers = {
    'app-context' : 'eyJleGVyY2ljaW8iOjIwMTh9',
    'authorization' : 'Bearer 4db29d34-d737-4d4f-8881-0d6d5774c1cd',
    'user-access': 'XE7RmJRhDkcwsMxnWEjONQ=='
}

const URL_BASE = "https://contabilidade.cloud.betha.com.br/contabilidade/api/contabil/empenhos"

const DELETE_REG = async (params) => {
    const param_request = {
        url : `${params.api}/${params.id}` ,
        method: 'delete',
        headers : headers
    }
    
    try {
        console.log(param_request);
        result = await axios(param_request)
        console.log(`[SUCESSO] - ${param_request.url}`)
        
    } catch (error) {
        console.log(`[ERRO] - ${param_request.url}`)
        console.log(error.config)
    }
}



(async () => {
    const ids = [
        1333806,
        261496,
        206420,
        195969,
        185805,
        169084,
        156062,
        156061,
        153679,
        153528,
        144091,
        126106,
        125438,
        125198,
        125197,
        115253,
        115235,
        115100,
        111996,
        84599,
        84598,
        84601,
        84597,
        84595,
        84593,
        84556,
        84592,
        84555,
        84554,
        84553,
        84541,
        77015,
        77014,
        77013,
        59173,
        59171,
        59165,
        51687,
        84594,
        84540,
        254576,
        74872,
        308646,
        76487,
        111864,
        111860,
        59164,
        111366,
        145292,
        111305,
        51899,
        51642
      ]
    for (let index = 0; index < ids.length ; index++) {
        await DELETE_REG({
            "api" : URL_BASE ,
            "id" : ids[index]
        })
        break;
    }
})();
