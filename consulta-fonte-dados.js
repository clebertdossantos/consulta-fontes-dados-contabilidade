// npm install axios => instar o axios por meio do node.
const fontesDados = require("./js/fontes-dados")
const axios = require('axios');
const base64 = require('base-64')
const exercicio = "{\"exercicio\":2020}";
const url = fontesDados.Dados.v1.contabil.empenhosIdentificadoresAdiantamentos;
const headers = {
    'app-context' : base64.encode(exercicio),
    'authorization' : fontesDados.token,
    'user-access': fontesDados.entidades.lages
};
// let fields = "banco(numeroBanco,id),"
// fields += "agencia(id,nome,numeroAgencia)"
const parametros = {
    // "fields" : "id,exercicio(ano),entidade(nome,id),numeroCadastro.numero,valor,data",
    "filter" : "exercicio.ano = 2020",
    "limit" : 1000, // podemos jogar uma paginação de até 10000
    "offset" : 0
};
const fonteDadosConsulta = {
    url : url ,
    method: 'get',
    params: parametros,
    headers : headers
}
console.log(">>>>>>>>>>>>>>>>>>>>   CONSULTA FONTE DE DADOS   <<<<<<<<<<<<<<<<<<<<")
console.log(`API : ${url}`)
// fonte de dados
axios(fonteDadosConsulta)
  .then(resp => {
      let fonteDados = resp.data.content;
      for(fonte of fonteDados){
        // console.log(JSON.stringify(fonte)) // linha como string
        console.log(fonte) // linha como json
        break;
      }
  })
  .catch(err => console.log(err))

