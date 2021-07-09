const { executionAsyncResource } = require('async_hooks')
const readline = require('readline')


function menu(texto) {
    const rl = readline.createInterface({
       input : process.stdin ,
       output : process.stdout
    })
    return new Promise(resolve =>{
        rl.question(texto , resp => {
           resolve(resp)
           rl.close()
        })
    })
}

function analista() { console.log(">> Estou analisando o requisito para enviar ao programador...") }
function programador() { console.log(">> Estou programando o sistema para entregar ao cliente...") }
function cliente() { console.log(">> Essa atualização do sistema ficou nota 10!") }
 

async function execucao(fluxo) {
    while(true){
       const resp = await menu(`Você deseja conhecer nossa rotina de implementação? (s/N/q) `)
       if(resp.toLowerCase() === 's'){
         (fluxo || []).forEach(obs => obs());
       }else if(resp.toLowerCase() === 'q'){
            break
       }
    }
}

execucao([analista,programador,cliente])

// menu(text_menu)
//     .then(resp => console.log(resp))