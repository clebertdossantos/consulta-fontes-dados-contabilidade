const fs = require('fs')
const path = require('path')

const obj_final = {
    "content" : [{
        "type" : "LIQUIDACAO",
        "records" : [2488109]
    }]
}

fs.writeFileSync(path.resolve(__dirname,'..','..','parametros_transparencia.json'),JSON.stringify(obj_final))

