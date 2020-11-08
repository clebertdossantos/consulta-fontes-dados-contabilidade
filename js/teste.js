const axios = require('axios');
const url = 'https://dados.cloud.betha.com.br/dados/api/sistemas/@current/fontes/com-ativos';
const headers = {
    'app-context' : 'eyJleGVyY2ljaW8iOjIwMjB9',
    'authorization' : 'Bearer d5265abe-ca3f-43b5-8eea-85ca00f84739',
    'user-access': 'TWaTFYXMMhFF5uQkLVZAcA=='
};
// let fields = "banco(numeroBanco,id),"
// fields += "agencia(id,nome,numeroAgencia)"
const parametros = {
    // "fields" : fields,
    "fields" : "banco(numeroBanco,id), agencia(id,nome,numeroAgencia), numero, digito, id, tipo,situacao"/*,
    "filter" : "id = 150128"*/
};
const fonteDadosConsulta = {
    url : url ,
    method: 'get',
    // params: parametros,
    headers : headers
}

//   >>>>>>>>>>>>>>>>>>>>   CONSULTA FONTE DE DADOS   <<<<<<<<<<<<<<<<<<<<

axios(fonteDadosConsulta)
  .then(resp => {
    //   console.log(resp.data)
      
      for(it of resp.data){
        if(it.identificador !== 'contabilidade') continue;
        let obj = {
            "contabil" : {}
        }
        for(ln of it.ativos){
            const regex = /fontes-adicionais/
            if(ln.endereco.match(regex)){
                console.log(ln)
                break
            }                
            
            // console.log(ln)    
            // console.log(`"${ln.tema.replace('.','')}" : "${"https://contabilidade-fontes-dados.cloud.betha.com.br".concat(ln.endereco)}",`)
            // console.log(`try{ fonte = Dados.contabilidade.v1.${ln.tema}.busca(campos : "id",primeiro:true) ; imprimir "[SUCESSO] - ${ln.tema} >> ".concat(String.valueOf(fonte)) ; }catch(e){ imprimir "[ERRO] -  ${ln.tema}"}`)
            // Object.assign(obj.contabil, { this.attr(ln.tema): this.atln.endereco});        
            // obj.contabil.put(ln.tema,ln.endereco)
        }
        // console.log(obj.contabil.emliquidacoesEmpenhos)
        // console.log(obj.contabil)
            //   console.log(it)
    }
    //   let fonteDados = resp.data.content;
    //   fonteDados.forEach(fonte => {
    //     console.log(fonte)
    //   });
    //   console.log(resp.data)
  })
  .catch(err => console.log(err))