def report = [:]
report['Anexo 01 - Demonstrativo da Despesa com Pessoal'] = "RGF_ANEXO1"
report['Anexo 03 - Demonstrativo da Receita Corrente Líquida'] = "RREO_ANEXO3"
report['Anexo 06 - Demonstrativo Simplificado do Relatório de Gestão Fiscal'] = "RREO_ANEXO6"
report['Anexo 02 - Demonstrativo da Dívida Consolidada Líquida'] = "RGF_ANEXO2"
report['Anexo 04 - Demonstrativo das Operações de Crédito'] = "RGF_ANEXO4"
report['Anexo 03 - Demonstrativo das Garantias e Contragarantias de Valores'] = "RGF_ANEXO3"
report['Anexo 14 - Demonstrativo Simplificado do Relatório Resumido da Execução Orçamentária'] = "RREO_ANEXO14"
report['Anexo 12 - Demonstrativo das Receitas e Despesas com Ações e Serviços Públicos de Saúde'] = "RREO_ANEXO12"
report['Anexo 07 - Demonstrativo dos Restos a Pagar por Poder e Órgão'] = "RREO_ANEXO"
report['Anexo 04 - Demonstrativo das Receitas e Despesas Previdenciárias'] = "RREO_ANEXO"
report['Anexo 02 - Demonstrativo da Execução das Despesas por Função-Subfunção'] = "RREO_ANEXO2"
report['Anexo 01 - Balanço Orçamentário'] = "RREO_ANEXO1"
report['[PMJS] Anexo 08 - Demonstrativo das Receitas e Despesas com Manutenção e Desenvolvimento do Ensino - MDE'] = "RREO_ANEXO8"

def newMapRelatorios = [:]
def newMapNotasExplicativas = [:]
def dtParametroExecucoes = Datas.removeDias(Datas.hoje(), 30).format("yyyy-MM-dd").concat("T00:00:00")
imprimir "${dtParametroExecucoes}"
def filter = "dataHoraInicio >= \"${dtParametroExecucoes}\" and artefato.chaveNatureza = 'LRF' and artefato.tipo = 'RELATORIO' and status = 'CONCLUIDO'"
def fonteExecucoes = Dados.plataforma.execucoes.v1.execucoes.busca(
  campos: "arquivoAssinadoUrl, id, protocolo, artefatoVersao, artefatoRascunho, idArtefato, tipo, chaveNatureza, execucaoAgendada, tituloAgendamento, autor, status, visibilidade, dataHoraInicio, dataHoraUltimaMovimentacao, concluido, dataHoraConclusao, gerouResultado, possuiParametro, mensagemConclusao, tipoConclusao, possuiArquivoResultado, possuiParticionamento, arquivoResultadoNome, arquivoResultadoExtensao, arquivoUrl, possuiArquivoAssinadoDigitalmente",
  //criterio : "dataHoraInicio >= $dtParametroExecucoes"
  criterio : filter,
  ordenacao : "dataHoraInicio desc"
)
for(ft in fonteExecucoes){ 
  def key = ['nome' : ft.arquivoResultadoNome.replace('.pdf','')]
  if(newMapRelatorios[key]){
    newMapRelatorios[key].protocolos.add("'${ft.protocolo}'")
  }else{
    newMapRelatorios[key] = [ protocolos : ["'${ft.protocolo}'"]]
  }
}


for(it in newMapRelatorios) imprimir it 
imprimir "------------------------"

for(it in newMapRelatorios){
    for(ix in it.value.protocolos){
        def fonteParametrosExecucao = Dados.plataforma.execucoes.v1.parametros.busca(campos: "nome,valor",criterio : "execucao.protocolo = ${ix} and nome = 'notas' and valor is not null" , primeiro :true)
        if(fonteParametrosExecucao?.valor?:null){
            imprimir "${it.key.nome} >> ${ix} | Nota Explicativa : ${fonteParametrosExecucao?.valor?:null}"
            break
        }else{
            continue;
        }
    }
}
                    
/*
*/