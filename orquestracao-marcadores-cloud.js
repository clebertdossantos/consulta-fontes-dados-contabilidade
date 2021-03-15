const axios = require('axios');

const marcadoresProducao = [
    "Alienação: De Bens e Ativos",
    "ASPS (Não computadas)",
    "ASPS (Não computadas): Outros recursos",
    "ASPS (Não computadas): Recursos de Transferências do SUS",
    "Conservação de patrimônio",
    "COVID-19",
    "DC: Outras Dívidas",
    "DC: Parcelamento com Instituição Não Financeira",
    "DC: Parcelamento de Contribuições Previdenciárias",
    "DC: Parcelamento de Demais Contribuições Sociais",
    "DC: Parcelamento de Tributos",
    "DC: Parcelamento do FGTS",
    "DC: Precatório Anterior 05/05/2000",
    "DC: Precatório Posterior 05/05/2000 (Não Vencido)",
    "DC: Precatório Posterior 05/05/2000 (Vencido)",
    "DC: Programas de modernização da máquina pública",
    "DC: Reestruturação da Dívida de Estados e Municípios",
    "Incremento Emendas MAC 06/2018",
    "Incremento Emendas PAB 06/2018",
    "Limite não cumprido",
    "MDE: Convênios",
    "MDE: Creche",
    "MDE: FUNDEB 40%",
    "MDE: FUNDEB 60%",
    "MDE: Impostos e transferências destinados MDE",
    "MDE: Operações de crédito",
    "MDE: Outras despesas",
    "MDE: Outras receitas",
    "MDE: PDDE",
    "MDE: PNAE",
    "MDE: PNATE",
    "MDE: Pré-escola",
    "MDE: Salário-educação",
    "MDE: Transferências FNDE",
    "MDE: Transporte escolar",
    "Pessoal (Não computado): Recursos vinculados ao RPPS",
    "RP Cancelados ASPS",
    "RPPS: Plano Financeiro",
    "RPPS: Plano Previdenciário",
    "SIOPS: Ações Atendimento",
    "SIOPS: Apoio, Diagnóstico e Tratamento",
    "SIOPS: ASPS",
    "SIOPS: Convênios",
    "SIOPS: Despesa PSF",
    "SIOPS: Despesa PACS",
    "SIOPS: Finac Ambulância",
    "SIOPS: Impostos",
    "SIOPS: LC 172/2020",
    "SIOPS: MP 938/2020",
    "SIOPS: Não ASPS",
    "SIOPS: Operações de Créditos",
    "SIOPS: Outras Fontes",
    "SIOPS: Outros Recursos",
    "SIOPS: PORTARIAS 488 E 545",
    "SIOPS: PORT MS 395/2020",
    "SIOPS: PORT MS 414/2020",
    "SIOPS: PORT MS 430/2020",
    "SIOPS: PORT MS 480/2020",
    "SIOPS: PORT MS 568/2020",
    "SIOPS: PORT MS 774-859/2020",
    "SIOPS: PORT MS 827/2020",
    "SIOPS: Receita de Impostos e Transferência de Impostos",
    "SIOPS: Recursos Ordinários",
    "SIOPS: Rede de Cuidados",
    "SIOPS: Royalties",
    "SIOPS: Royalties do Petróleos",
    "SIOPS: SAMU",
    "SIOPS: SUS Estadual",
    "SIOPS: SUS Federal",
    "SIOPS: Transferências de Convênios",
    "SIOPS: Transferência SUS Estadual",
    "SIOPS: Transferência SUS Federal",
    "SIOPS: Transporte Sanitário Eletivo"
]

const URL_MARCADORES = "https://contabilidade.cloud.betha.com.br/contabilidade/api/marcadores" 

const headers = {
    'app-context': 'eyJleGVyY2ljaW8iOjIwMjB9',
    'authorization': 'Bearer acfe3a58-fb15-4f1c-bf58-a157323f62e5',
    'user-access': "Ss18tjAfRFM=",
    'content-type': 'application/json;charset=UTF-8'
}

async function setMarcador(descricao) {
    const json_envio = {"descricao" : descricao}
    const post = {
        url : URL_MARCADORES ,
        method: 'post',
        headers : headers,
        data : JSON.stringify(json_envio)
    }
    try{
        const result = await axios(post)
        console.log("SUCESSO >> " , JSON.stringify(result.data))
    }catch(e){
        console.log("ERRO >> ",descricao)
        // console.log(e)
    }
}


(async () => {
    for(idx = 0 ; idx <= (marcadoresProducao.length - 1) ; idx++){
        await setMarcador(marcadoresProducao[idx])
    }
})();

