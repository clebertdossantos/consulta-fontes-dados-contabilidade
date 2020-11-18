const fs = require('fs')
// const {readFile} = require('fs').promises
const fileArray = fs.readFileSync('./file/teste.csv').toString().split('\n')
for(it of fileArray){
    console.log('linha >> ', it.split(','))
}
