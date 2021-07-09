const fs = require('fs')
const file = JSON.parse(fs.readFileSync('C:\\Users\\cleber.santos.BETHA\\Desktop\\integracao-folha_new.json').toString())
const cpf_filter = '07210057994'
const findFuncionario = (funcionario) => funcionario.cpf == cpf_filter ;

for(it of file){
    if(it.competencia > 2) continue ; 
    const dados_integracao = `[${it.tipoProcessamento}] - ${it.competencia}/${it.exercicio}`
    
    // console.log(it)
    try{
        for(aux of it.encargos){
            // console.log(aux);
            const result = aux.funcionarios.filter(findFuncionario)
            if(result.length > 0){
                for(func of result){
                    console.log(`${dados_integracao} [${it.idIntegracao}] - ${aux.numeroOrganograma} - [encargo] ${aux.descricaoEncargo} | | ${aux.classificacao} |${func.nome} | -${func.valor.toString().replace('.',',')}`)
                }
            }else{
                continue;
            }
        }
    }catch(e){
        for(aux of it.eventos){
            // console.log(aux);
            const result = aux.funcionarios.filter(findFuncionario)
            if(result.length > 0){
                for(func of result){
                    console.log(`${dados_integracao} [${it.idIntegracao}] - ${aux.numeroOrganograma} - [eventos] ${aux.descricaoEvento} |${aux.tipoEvento}|${aux.classificacao} |${func.nome} | ${func.valor.toString().replace('.',',')}`)
                }
            }else{
                continue;
            }
        }
    }
}


