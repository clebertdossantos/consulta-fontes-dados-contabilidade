const { count } = require('console');
const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname,'artefatos')

const pasteFile = fs.readdirSync(dir)

const commentFile = ((param_file) => {
    const arrayReadFile = fs.readFileSync(param_file.dir).toString('UTF-8').split('\n')
    let countImprimir = 0
    for(i = 0 ; i <= arrayReadFile.length-1 ; i++){
        // console.log(
        //     '|',
        //     arrayReadFile[i].search(/imprimir/),
        //     '|',
        //     arrayReadFile[i].search(/mostraLog/),
        //     ' [',
        //     i,
        //     ']',
        //     ' - ',
        //     arrayReadFile[i])
        if(arrayReadFile[i].search(/imprimir/) >= 0 && arrayReadFile[i].search(/mostraLog/) === -1){
            countImprimir++
            arrayReadFile[i] = "//".concat(arrayReadFile[i])
        }
    }
    console.log(`[${countImprimir}] - ${param_file.name}`)
    fs.writeFileSync(path.join(__dirname,'new-artefatos',param_file.name),arrayReadFile.join('\n'))
});


(async () => {
    for(name_file of pasteFile){
        await commentFile({"name" : name_file,"dir" : path.join(dir,name_file)})
    }
})();