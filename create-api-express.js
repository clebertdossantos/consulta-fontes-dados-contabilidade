const express = require('express');

const app = express()

app.use(express.json())

app.get('/', (require, response)=> {
response.json({
content: {
msg: 'melhor que java'
}
})
})

app.get('/ppa', (require, response)=> {
response.json({
content: {
exercicio: 2020,
entidade: 1
}
})
})

app.listen(3333, () => console.log('iniciou o servidor'))