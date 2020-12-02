const axios = require('axios').default;
const fontesDados = require("./js/fontes-dados")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const rest = async function(request){
//     console.log(request);
//     try{
//         axios(request)
//             .then(resp => {
//                 console.log(resp)
//             })
//             .catch(err => err)
//     }catch(e){
//         console.log(`Erro do try{}catch{} ${e}`);
//     }
// };

// const executar = async function(params) {
//     await rest(params)
//     await sleep(2000)
//     console.log(`Lá foi a execução`)
// }



/*
* consulta fonte de dados
*/
const url = fontesDados.Dados.v1.contabil.recursos 
const fields = "id"
const filter = "exercicio.ano = 2020 and entidade.id = 32"
const headers = {
    //'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.tokenSistemas,
    'user-access': fontesDados.entidades.jaraguadosul
}

const limit = 50
const parametros = {
    "timeout" : 180,
    "limit" : limit, 
    "offset" : 0,
    // "offset" : (pag-limit),
    "fields" : fields,
    // "filter" : filter
}
const fonteDadosConsulta = {
    url : url ,
    method: 'get',
    params: parametros,
    headers : headers
}

const request = async () =>{
    try{
        console.log(fonteDadosConsulta)
        const result = await axios(fonteDadosConsulta)
        console.log(result.data)
    }catch(e){
        console.log(e)
    }
}
request()

// axios(fonteDadosConsulta)
//     .then(resp => {
//         if(resp.data.content.length !== 0){
//             console.log(`[SUCESSO] -> fonte | offset : ${parametros.offset} / limit : ${parametros.limit} -> Size : ${resp.data.content.length}`)
//         }
//     })
//     .catch(err => {
//         console.log(`[ERRO] -> ${err}`,err)
//         // console.log(`[ERRO] -> ${url} => ${err} offset : ${parametros.offset} / limit : ${parametros.limit}`)
//     })



// const nome = "Componente - RREO 2019/ Anexo 2 - Demonstrativo da Execução das Despesas por Função/Subfunção.groovy"
// const nome = "https://contabilidade-fontes-dados.cloud.betha.com.br/contabilidade/fontes-dados/contabil/recursos"
// console.log(nome.split('/'))
//Array.prototype.


// const {spawn} = require('child_process')
// // const ls = spawn('cd',['file-busca-artefatos','dir'])
// const ls = spawn('dir')
// ls.stdout.on('data', (data)=>{
//     console.log(`stdout: ${data}`)
// })

// const cp = require('child_process')
// const ls = cp.spawn('dir')
// ls.stdout.on('data', (data)=>{
//     console.log(`stdout: ${data}`)
// })


console.log(__dirname);


// const { spawn } = require("child_process");
// console.log(spawn);

// const { argv } = require('process');
// console.log(cp);
// const { spawn } = require("child_process")
// const ls = spawn('ls', ['-lh', '/usr'])

// //stdio
// ls.stdout.on('data',(data)=>{
//     console.log(`stdout: ${data}`)
// })
// ls.stderr.on('data',(data)=>{
//     console.log(`stderr: ${data}`)
// })

// ls.on('close', (code)=>{
//     console.log(`Processo em segundo plano finalizado com sucesso! \n code: ${code}`)
// })