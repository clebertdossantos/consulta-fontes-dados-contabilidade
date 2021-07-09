const axios = require('axios');
const fontesDados = require("./js/fontes-dados")
const fs= require('fs');
const { type } = require('os');

const headers = {
    'authorization' : 'Bearer fe00d2e3-6e45-4e05-9bce-756a174b95c7',
    'user-access': 'OU8BLmRVTuTB59Y5aIIwXdgDlnZyBz6i'
}

const parametros = {
    "limit" : 100, // podemos jogar uma paginação de até 10000
    "offset" : 0
}
const test = {
    test : {
        teste : {
            teste : ""
        }
    },
    test :{
        teste : {
            fim : {
                
            }
        }
    }
}


console.log(test['teste'])

return

const URL_BASE = `https://plataforma-dados.betha.cloud/dados/api/sistemas/@current/ativos/58b81eb720591100cf911015/metadados`
console.log(URL_BASE);

(async () => { 
    try {
        condition = true
        while(condition){
            const param_request = {
                url : URL_BASE ,
                method: 'get',
                headers : headers,
                params : parametros
            }
            const result = await axios(param_request)
            const keys = Object.keys(result.data.expressions)
            const elementos = result.data.expressions
            console.log(keys.length);
            for(nome of keys){
                console.log(nome.split('.'));
            }
            condition = result.data.hasNext
            parametros.offset += parametros.limit
        }
    } catch (error) {
        console.log("ERROOOO CONSULTA")
        console.log(error.response.data);
    }
})();


