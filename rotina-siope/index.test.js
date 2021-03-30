const fs = require('fs')
const path = require('path')
const filesDir = fs.readdirSync(path.join(__dirname,'file-siope-2021'))
const planilhaSIOPE = []
planilhaSIOPE.push(
    "Código da Planilha;"
    .concat("Primeira Camada SIOPE;")
    .concat("Segunda Camada SIOPE;")
    .concat("Terceira Camada SIOPE;")
    .concat("Quarta Camada SIOPE;")
    .concat("Quinta Camada SIOPE;")
    .concat("Observação/Regra")
) // cabeçalho do arquivo 


const replace_string = (text) => {
    text = text
            .replace('Pr�prias','Próprias')
            .replace('B�sica','Básica')
            .replace('M�dio','Médio')
            .replace('Previd�ncia','Previdencia')
            .replace('Administra��o','Administração')
            .replace('Nutri��o','Nutrição')
            .replace('Alimenta��o','Alimentação')
            .replace('Alimenta��o','Alimentação')
            .replace('Transfer�ncias','Transferências')
            .replace('Educa��o','Educação')
            .replace('Qualifica��o','Qualificação')
            .replace('Telecomunica��es','Telecomunicações')
            .replace('Difus�o','Difusão')
            .replace('Comunit�rio','Comunitário')
            .replace('Dist�ncia','Distância')
            .replace('Pr�','Pré')
            .replace('Estatut�rio','Estatutário')
            .replace('Exerc�cio','Exercício')
            .replace('A��o','Ação')
            .replace('Precat�rios','Precatórios')
            .replace('Vinculadas �','Vinculadas à')
            .replace('Vinculados �','Vinculados à')
            .replace('Cr�dito','Crédito')
            .replace('Opera��es','Operações')
            .replace('Petr�leo','Petróleo')
            .replace('G�s','Gás')
            .replace('Conv�nios','Convênios')
            .replace('vinculados �','vinculados à')
            .replace('Munic�pios','Municípios')
            .replace('Uni�o','União')
            .replace('Sal�rio','Salário')
            .replace('Contribui��o','Contribuição')
            .replace('Institui��o','Instituição')
            .replace('Descri��o','Descrição')
            .replace('C�digo','Código')
            .replace('C�d','Cód')
            .replace('Informa��es','Informações')
            .replace('Complementa��o','Complementação')
            .replace('N�o','Não')
            .replace('n�o','não')
            .replace('Manuten��o','Manutenção')
            .replace('Super�vit','Superávit')
            .replace('at�','até')
            .replace('At�','Até')
            .replace('AT�','ATÉ')
            .replace('Aplica��o','Aplicação')
            .replace('Inscri��o','Inscrição')
            .replace('Remunera��o','Remuneração')
            .replace('dep�sitos','depósitos')
            .replace('banc�rios','bancários')
            .replace('pr�prios','próprios')
            .replace('Transfer�ncia','Transferência')
            .replace('Fundef � ','Fundef – ')
            .replace('\r','')
            .replace('Transfer�nicas','Transferênicas')
            .replace('integrar�','integrará')
            .replace('1�','1º')
            .replace('exerc�cio','exercício')
            
    return text 
}

for(nameFile of filesDir){
    console.log(nameFile)
    const contentFile = fs.readFileSync(path.join(__dirname,'file-siope-2021',nameFile),"utf8").toString().split('\n')
    for(ln = 0 ; ln <= contentFile.length -1; ln++){
        // const line = contentFile[ln].split(';')
        const line = contentFile[ln].replace(';;;;;;;;;','').split(';')
        if(line[0] === "T"){
            const regx = /[0-9]/g
            const regx2021 = /2021/g
            const regx2020 = /2020/g
            const findCode = line[line.length-1].split('\\')
            const valid = findCode[findCode.length-1]
            var camada1 = ""
            var camada2 = ""
            var camada3 = ""
            var camada4 = ""
            var camada5 = ""
            var codPlanilha = ""
            if(valid.match(regx) !== null && valid.match(regx2020) === null && valid.match(regx2021) === null){
                const nextLine = contentFile[ln+2].split(';')
                if(findCode.length  === 8){
                    camada1 = replace_string(findCode[findCode.length-5].replace('\r',''))
                    camada2 = replace_string(findCode[findCode.length-4].replace('\r',''))
                    camada3 = replace_string(findCode[findCode.length-3].replace('\r',''))
                    camada4 = replace_string(findCode[findCode.length-2].replace('\r',''))
                    camada5 = replace_string(findCode[findCode.length-1].replace('\r',''))
                    codPlanilha = nextLine[2]
                }else if(findCode.length  === 7){
                    camada1 = replace_string(findCode[findCode.length-4].replace('\r',''))
                    camada2 = replace_string(findCode[findCode.length-3].replace('\r',''))
                    camada3 = replace_string(findCode[findCode.length-2].replace('\r',''))
                    camada4 = replace_string(findCode[findCode.length-1].replace('\r',''))
                    codPlanilha = nextLine[2]

                }else if(findCode.length  === 6){
                    camada1 = replace_string(findCode[findCode.length-3].replace('\r',''))
                    camada2 = replace_string(findCode[findCode.length-2].replace('\r',''))
                    camada3 = replace_string(findCode[findCode.length-1].replace('\r',''))
                    codPlanilha = nextLine[2]
                }else if(findCode.length  === 5){
                    camada1 = replace_string(findCode[findCode.length-2].replace('\r',''))
                    camada2 = replace_string(findCode[findCode.length-1].replace('\r',''))
                    codPlanilha = nextLine[2]
                }else{
                    console.log(findCode)
                }
                // console.log(`[${findCode[findCode.length-2].replace('\r','')}] - ${findCode[findCode.length-1].replace('\r','')} >> Código : ${nextLine[2]}`)
                planilhaSIOPE.push( `${parseInt(codPlanilha)};`
                    .concat(`${camada1.substring(1,(camada1.length -1))};`)
                    .concat(`${camada2.substring(1,(camada2.length))};`)
                    .concat(`${camada3.substring(1,(camada3.length))};`)
                    .concat(`${camada4.substring(1,(camada4.length))};`)
                    .concat(`${camada5.substring(1,(camada5.length))}`)
                )
                // break
            }else{
                continue
            }
            // break
        }else{
            continue  
        } 
    }
}
fs.writeFileSync(path.join(__dirname,'planilha-siope-config-2021.csv'),planilhaSIOPE.join('\n'))
