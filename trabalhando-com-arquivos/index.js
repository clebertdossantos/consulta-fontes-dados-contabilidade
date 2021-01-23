const fs = require('fs')
const path = require('path')
const caminho = path.join(__dirname,'arquivos')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const arquivos = fs.readdirSync(caminho).map(arquivo => {
                return path.join(caminho, arquivo)
            })
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }
    })
}

const deleteFile = function(dir) {
    if(dir.length === 0){ 
        console.log('Pasta Vazia!!!')
        return
    }
    for(it of dir ){
        console.log(`Exclusão do arquivo : ${it}`)
        fs.unlinkSync(it)
    }
}

lerDiretorio(caminho)
    .then(resp => deleteFile(resp))
    .catch(err => console.log(`[ERRO] Este caminho não é valido : ${caminho}`))


