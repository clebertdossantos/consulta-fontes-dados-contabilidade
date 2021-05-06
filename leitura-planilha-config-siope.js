const fs = require('fs')
const path = require('path')
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

const obj = []
const contentFile = fs.readFileSync(path.join(__dirname,"planilha-siope-config-2021.csv"),"utf8").toString().split('\n')
for(ln = 0 ; ln <= contentFile.length -1; ln++){
    var  result = contentFile[ln].replace('\r',"").replace("'","").split(",")
    var linha = [
        parseInt(result[0]),
        result[1],
        result[2],
        result[3],
        result[4],
        result[5]
    ]
    obj.push(`"${linha}",`)
}

console.log(obj.join("\n"))

// for(it of obj){
//     console.log(it.toString())
//     break
// }

