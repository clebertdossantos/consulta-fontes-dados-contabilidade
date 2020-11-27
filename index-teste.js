// const nome = "Componente - RREO 2019/ Anexo 2 - Demonstrativo da Execução das Despesas por Função/Subfunção.groovy"
const nome = "https://contabilidade-fontes-dados.cloud.betha.com.br/contabilidade/fontes-dados/contabil/recursos"
console.log(nome.split('/'))
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