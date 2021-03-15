const axios = require('axios');

const processamento = {
    sucesso : 0 ,
    naoProcessado : {
        total : 0 , 
        lotes : []
    },
    erro : 0 
}

const headers = {
    'authorization' : 'Bearer adb1e35b-5e3a-40e7-8cf4-7aa021a34d5c'
}


const lotes = [
    '603f013a6cc1a0006c82b4ef', 
    '603f013a6cc1a0006c82b4f1', 
    '603f013a32ff58006cf53cc2', 
    '603f013a6cc1a0006c82b4f3', 
    '603f013a32ff58006cf53cc4', 
    '603f013a6cc1a0006c82b4f5', 
    '603f013a6cc1a0006c82b4f7', 
    '603f013a32ff58006cf53cc6', 
    '603f013b32ff58006cf53cc8', 
    '603f013b6cc1a0006c82b4f9', 
    '603f013b6cc1a0006c82b4fb', 
    '603f013b32ff58006cf53cca', 
    '603f013b32ff58006cf53ccc', 
    '603f013b6cc1a0006c82b4fd', 
    '603f013b32ff58006cf53cce', 
    '603f013b32ff58006cf53cd0', 
    '603f013b6cc1a0006c82b4ff', 
    '603f013b6cc1a0006c82b501', 
    '603f013b32ff58006cf53cd2', 
    '603f013c32ff58006cf53cd4', 
    '603f013c6cc1a0006c82b503', 
    '603f013c6cc1a0006c82b505', 
    '603f013c6cc1a0006c82b507', 
    '603f013c32ff58006cf53cd6', 
    '603f013c6cc1a0006c82b509', 
    '603f013c32ff58006cf53cd8', 
    '603f013c6cc1a0006c82b50b', 
    '603f013d32ff58006cf53cda', 
    '603f013d32ff58006cf53cdc', 
    '603f013d32ff58006cf53cde', 
    '603f013d6cc1a0006c82b50d', 
    '603f013d6cc1a0006c82b50f', 
    '603f013d32ff58006cf53ce0', 
    '603f013d6cc1a0006c82b511', 
    '603f013d6cc1a0006c82b513', 
    '603f013d32ff58006cf53ce2', 
    '603f013d32ff58006cf53ce4', 
    '603f013d32ff58006cf53ce6', 
    '603f013d6cc1a0006c82b515', 
    '603f013e6cc1a0006c82b517', 
    '603f013e6cc1a0006c82b519', 
    '603f013e32ff58006cf53ce8', 
    '603f013e32ff58006cf53cea', 
    '603f013e6cc1a0006c82b51b', 
    '603f013e6cc1a0006c82b51d', 
    '603f013e32ff58006cf53cec', 
    '603f013e32ff58006cf53cee', 
    '603f013e6cc1a0006c82b51f', 
    '603f013e32ff58006cf53cf0', 
    '603f013e6cc1a0006c82b521', 
    '603f013e32ff58006cf53cf2', 
    '603f013e32ff58006cf53cf4', 
    '603f013e6cc1a0006c82b523', 
    '603f013e6cc1a0006c82b525', 
    '603f013e32ff58006cf53cf6', 
    '603f013e32ff58006cf53cf8', 
    '603f013e6cc1a0006c82b527', 
    '603f013f6cc1a0006c82b529', 
    '603f013f32ff58006cf53cfa', 
    '603f013f6cc1a0006c82b52b', 
    '603f013f6cc1a0006c82b52d', 
    '603f013f32ff58006cf53cfc', 
    '603f013f32ff58006cf53cfe', 
    '603f013f32ff58006cf53d00', 
    '603f013f6cc1a0006c82b52f', 
    '603f013f6cc1a0006c82b531', 
    '603f013f6cc1a0006c82b533', 
    '603f013f32ff58006cf53d02', 
    '603f013f6cc1a0006c82b535', 
    '603f013f32ff58006cf53d04', 
    '603f013f32ff58006cf53d06', 
    '603f014032ff58006cf53d08', 
    '603f01406cc1a0006c82b537', 
    '603f014032ff58006cf53d0a', 
    '603f01406cc1a0006c82b539', 
    '603f01406cc1a0006c82b53b', 
    '603f01406cc1a0006c82b53d', 
    '603f014032ff58006cf53d0c', 
    '603f01406cc1a0006c82b53f', 
    '603f014032ff58006cf53d0e', 
    '603f014032ff58006cf53d10', 
    '603f01406cc1a0006c82b541', 
    '603f01406cc1a0006c82b543', 
    '603f014032ff58006cf53d12', 
    '603f01406cc1a0006c82b545', 
    '603f014032ff58006cf53d14', 
    '603f014132ff58006cf53d16', 
    '603f014132ff58006cf53d18', 
    '603f01416cc1a0006c82b547', 
    '603f01416cc1a0006c82b549', 
    '603f01416cc1a0006c82b54b', 
    '603f014132ff58006cf53d1a', 
    '603f014132ff58006cf53d1c', 
    '603f01426cc1a0006c82b54d', 
    '603f01426cc1a0006c82b54f', 
    '603f014232ff58006cf53d1e', 
    '603f01426cc1a0006c82b551', 
    '603f014232ff58006cf53d20', 
    '603f014232ff58006cf53d22', 
    '603f01426cc1a0006c82b553', 
    '603f014232ff58006cf53d24', 
    '603f01426cc1a0006c82b555', 
    '603f014232ff58006cf53d26', 
    '603f014232ff58006cf53d28', 
    '603f01426cc1a0006c82b557', 
    '603f01426cc1a0006c82b559', 
    '603f014232ff58006cf53d2a', 
    '603f014232ff58006cf53d2c', 
    '603f01426cc1a0006c82b55b', 
    '603f01426cc1a0006c82b55d', 
    '603f014232ff58006cf53d2e', 
    '603f01426cc1a0006c82b55f', 
    '603f014332ff58006cf53d30', 
    '603f01436cc1a0006c82b561', 
    '603f014332ff58006cf53d32', 
    '603f014332ff58006cf53d34', 
    '603f01436cc1a0006c82b563', 
    '603f014332ff58006cf53d36', 
    '603f01436cc1a0006c82b565', 
    '603f01436cc1a0006c82b567', 
    '603f014332ff58006cf53d38', 
    '603f01436cc1a0006c82b569', 
    '603f01436cc1a0006c82b56b', 
    '603f014332ff58006cf53d3a', 
    '603f014332ff58006cf53d3c', 
    '603f014332ff58006cf53d3e', 
    '603f01436cc1a0006c82b56d', 
    '603f014332ff58006cf53d40', 
    '603f01436cc1a0006c82b56f', 
    '603f01436cc1a0006c82b571', 
    '603f014332ff58006cf53d42', 
    '603f01446cc1a0006c82b573', 
    '603f014432ff58006cf53d44', 
    '603f014432ff58006cf53d46', 
    '603f01446cc1a0006c82b575', 
    '603f01446cc1a0006c82b577', 
    '603f014432ff58006cf53d48', 
    '603f01446cc1a0006c82b579', 
    '603f014432ff58006cf53d4a', 
    '603f014432ff58006cf53d4c', 
    '603f01446cc1a0006c82b57b', 
    '603f014432ff58006cf53d4e', 
    '603f01446cc1a0006c82b57d', 
    '603f01446cc1a0006c82b57f', 
    '603f01446cc1a0006c82b581', 
    '603f014432ff58006cf53d50', 
    '603f014432ff58006cf53d52', 
    '603f014532ff58006cf53d54', 
    '603f01456cc1a0006c82b583', 
    '603f014532ff58006cf53d56', 
    '603f01456cc1a0006c82b585', 
    '603f014532ff58006cf53d58', 
    '603f01456cc1a0006c82b587', 
    '603f01456cc1a0006c82b589', 
    '603f014532ff58006cf53d5a', 
    '603f014532ff58006cf53d5c', 
    '603f01456cc1a0006c82b58b', 
    '603f01456cc1a0006c82b58d', 
    '603f01456cc1a0006c82b58f', 
    '603f014532ff58006cf53d5e', 
    '603f014532ff58006cf53d60', 
    '603f014532ff58006cf53d62', 
    '603f01456cc1a0006c82b591', 
    '603f014532ff58006cf53d64', 
    '603f01456cc1a0006c82b593', 
    '603f01456cc1a0006c82b595', 
    '603f014532ff58006cf53d66', 
    '603f01456cc1a0006c82b597', 
    '603f01466cc1a0006c82b599', 
    '603f014632ff58006cf53d68', 
    '603f014632ff58006cf53d6a', 
    '603f01466cc1a0006c82b59b', 
    '603f01466cc1a0006c82b59d', 
    '603f014632ff58006cf53d6c', 
    '603f014632ff58006cf53d6e', 
    '603f01466cc1a0006c82b59f', 
    '603f014632ff58006cf53d70', 
    '603f01466cc1a0006c82b5a1', 
    '603f01476cc1a0006c82b5a3', 
    '603f014732ff58006cf53d72', 
    '603f014732ff58006cf53d74', 
    '603f01476cc1a0006c82b5a5', 
    '603f01476cc1a0006c82b5a7', 
    '603f014732ff58006cf53d76', 
    '603f01476cc1a0006c82b5a9', 
    '603f014732ff58006cf53d78', 
    '603f01476cc1a0006c82b5ab', 
    '603f014732ff58006cf53d7a', 
    '603f014732ff58006cf53d7c', 
    '603f014732ff58006cf53d7e', 
    '603f01476cc1a0006c82b5ad', 
    '603f014732ff58006cf53d80', 
    '603f01476cc1a0006c82b5af', 
    '603f01476cc1a0006c82b5b1', 
    '603f01476cc1a0006c82b5b3', 
    '603f014732ff58006cf53d82', 
    '603f014832ff58006cf53d84', 
    '603f014832ff58006cf53d86', 
    '603f01486cc1a0006c82b5b5', 
    '603f01486cc1a0006c82b5b7', 
    '603f014832ff58006cf53d88', 
    '603f01486cc1a0006c82b5b9', 
    '603f014832ff58006cf53d8a', 
    '603f014832ff58006cf53d8c', 
    '603f01486cc1a0006c82b5bb', 
    '603f01486cc1a0006c82b5bd', 
    '603f014832ff58006cf53d8e', 
    '603f014932ff58006cf53d90', 
    '603f01496cc1a0006c82b5bf', 
    '603f01496cc1a0006c82b5c1', 
    '603f01496cc1a0006c82b5c3', 
    '603f014932ff58006cf53d92', 
    '603f014932ff58006cf53d94', 
    '603f01496cc1a0006c82b5c5', 
    '603f01496cc1a0006c82b5c7', 
    '603f014932ff58006cf53d96', 
    '603f014932ff58006cf53d98', 
    '603f014932ff58006cf53d9a', 
    '603f01496cc1a0006c82b5c9', 
    '603f01496cc1a0006c82b5cb', 
    '603f01496cc1a0006c82b5cd', 
    '603f014932ff58006cf53d9c', 
    '603f01496cc1a0006c82b5cf', 
    '603f014932ff58006cf53d9e', 
    '603f01496cc1a0006c82b5d1', 
    '603f014932ff58006cf53da0', 
    '603f01496cc1a0006c82b5d3', 
    '603f014932ff58006cf53da2', 
    '603f014a32ff58006cf53da4', 
    '603f014a6cc1a0006c82b5d5', 
    '603f014a6cc1a0006c82b5d7', 
    '603f014a32ff58006cf53da6', 
    '603f014a32ff58006cf53da8', 
    '603f014a32ff58006cf53daa', 
    '603f014a6cc1a0006c82b5d9', 
    '603f014a6cc1a0006c82b5db', 
    '603f014a32ff58006cf53dac', 
    '603f014a32ff58006cf53dae', 
    '603f014a6cc1a0006c82b5dd', 
    '603f014a6cc1a0006c82b5df', 
    '603f014a6cc1a0006c82b5e1', 
    '603f014a32ff58006cf53db0', 
    '603f014a32ff58006cf53db2', 
    '603f014b6cc1a0006c82b5e3', 
    '603f014b6cc1a0006c82b5e5', 
    '603f014b32ff58006cf53db4', 
    '603f014b6cc1a0006c82b5e7', 
    '603f014b32ff58006cf53db6', 
    '603f014b32ff58006cf53db8', 
    '603f014b6cc1a0006c82b5e9', 
    '603f014b32ff58006cf53dba', 
    '603f014b6cc1a0006c82b5eb', 
    '603f014b32ff58006cf53dbc', 
    '603f014b6cc1a0006c82b5ed', 
    '603f014b32ff58006cf53dbe', 
    '603f014b32ff58006cf53dc0', 
    '603f014c6cc1a0006c82b5ef', 
    '603f014c6cc1a0006c82b5f1', 
    '603f014c6cc1a0006c82b5f3', 
    '603f014c32ff58006cf53dc2', 
    '603f014c32ff58006cf53dc4', 
    '603f014c6cc1a0006c82b5f5', 
    '603f014c32ff58006cf53dc6', 
    '603f014c6cc1a0006c82b5f7', 
    '603f014c6cc1a0006c82b5f9', 
    '603f014c32ff58006cf53dc8', 
    '603f014d32ff58006cf53dca', 
    '603f014d6cc1a0006c82b5fb', 
    '603f014d6cc1a0006c82b5fd', 
    '603f014d32ff58006cf53dcc', 
    '603f014d32ff58006cf53dce', 
    '603f014d32ff58006cf53dd0', 
    '603f014d6cc1a0006c82b5ff', 
    '603f014d6cc1a0006c82b601', 
    '603f014d32ff58006cf53dd2', 
    '603f014d32ff58006cf53dd4', 
    '603f014d6cc1a0006c82b603', 
    '603f014d6cc1a0006c82b605', 
    '603f014d32ff58006cf53dd6', 
    '603f014d6cc1a0006c82b607', 
    '603f014d6cc1a0006c82b609', 
    '603f014e32ff58006cf53dd8', 
    '603f014e6cc1a0006c82b60b', 
    '603f014e32ff58006cf53dda', 
    '603f014e32ff58006cf53ddc', 
    '603f014e32ff58006cf53dde', 
    '603f014e6cc1a0006c82b60d', 
    '603f014e32ff58006cf53de0', 
    '603f014e6cc1a0006c82b60f', 
    '603f014e6cc1a0006c82b611', 
    '603f014e32ff58006cf53de2', 
    '603f014e6cc1a0006c82b613', 
    '603f014e6cc1a0006c82b615', 
    '603f014e32ff58006cf53de4', 
    '603f014e6cc1a0006c82b617', 
    '603f014e32ff58006cf53de6', 
    '603f014e32ff58006cf53de8', 
    '603f014e6cc1a0006c82b619', 
    '603f014e6cc1a0006c82b61b', 
    '603f014f32ff58006cf53dea', 
    '603f014f32ff58006cf53dec', 
    '603f014f6cc1a0006c82b61d', 
    '603f014f32ff58006cf53dee', 
    '603f014f6cc1a0006c82b61f', 
    '603f014f32ff58006cf53df0', 
    '603f014f6cc1a0006c82b621', 
    '603f014f6cc1a0006c82b623', 
    '603f014f32ff58006cf53df2', 
    '603f014f6cc1a0006c82b625', 
    '603f014f32ff58006cf53df4', 
    '603f014f32ff58006cf53df6', 
    '603f014f6cc1a0006c82b627', 
    '603f014f32ff58006cf53df8', 
    '603f014f6cc1a0006c82b629', 
    '603f01506cc1a0006c82b62b', 
    '603f015032ff58006cf53dfa', 
    '603f015032ff58006cf53dfc', 
    '603f015032ff58006cf53dfe', 
    '603f01506cc1a0006c82b62d', 
    '603f01506cc1a0006c82b62f', 
    '603f01506cc1a0006c82b631', 
    '603f015032ff58006cf53e00', 
    '603f015032ff58006cf53e02', 
    '603f01506cc1a0006c82b633', 
    '603f015032ff58006cf53e04', 
    '603f01506cc1a0006c82b635', 
    '603f015032ff58006cf53e06', 
    '603f01506cc1a0006c82b637', 
    '603f01506cc1a0006c82b639', 
    '603f015032ff58006cf53e08', 
    '603f01506cc1a0006c82b63b', 
    '603f015132ff58006cf53e0a', 
    '603f015132ff58006cf53e0c', 
    '603f01516cc1a0006c82b63d', 
    '603f01516cc1a0006c82b63f', 
    '603f015132ff58006cf53e0e', 
    '603f01516cc1a0006c82b641', 
    '603f015132ff58006cf53e10', 
    '603f015132ff58006cf53e12', 
    '603f01516cc1a0006c82b643', 
    '603f015132ff58006cf53e14', 
    '603f01516cc1a0006c82b645', 
    '603f01516cc1a0006c82b647', 
    '603f015132ff58006cf53e16', 
    '603f015132ff58006cf53e18', 
    '603f015132ff58006cf53e1a', 
    '603f01516cc1a0006c82b649', 
    '603f015132ff58006cf53e1c', 
    '603f01516cc1a0006c82b64b', 
    '603f01516cc1a0006c82b64d', 
    '603f015132ff58006cf53e1e', 
    '603f01526cc1a0006c82b64f', 
    '603f01526cc1a0006c82b651', 
    '603f015232ff58006cf53e20', 
    '603f015232ff58006cf53e22', 
    '603f015232ff58006cf53e24', 
    '603f01526cc1a0006c82b653', 
    '603f015232ff58006cf53e26', 
    '603f01526cc1a0006c82b655', 
    '603f01526cc1a0006c82b657', 
    '603f015232ff58006cf53e28', 
    '603f01526cc1a0006c82b659', 
    '603f01526cc1a0006c82b65b', 
    '603f015232ff58006cf53e2a', 
    '603f015232ff58006cf53e2c', 
    '603f01526cc1a0006c82b65d', 
    '603f015232ff58006cf53e2e', 
    '603f01526cc1a0006c82b65f', 
    '603f01526cc1a0006c82b661', 
    '603f015332ff58006cf53e30', 
    '603f015332ff58006cf53e32', 
    '603f01536cc1a0006c82b663', 
    '603f01536cc1a0006c82b665', 
    '603f015332ff58006cf53e34', 
    '603f01536cc1a0006c82b667', 
    '603f015332ff58006cf53e36', 
    '603f015332ff58006cf53e38', 
    '603f01536cc1a0006c82b669', 
    '603f015332ff58006cf53e3a', 
    '603f01536cc1a0006c82b66b', 
    '603f015332ff58006cf53e3c', 
    '603f01536cc1a0006c82b66d', 
    '603f015332ff58006cf53e3e', 
    '603f015332ff58006cf53e40', 
    '603f01536cc1a0006c82b66f', 
    '603f015432ff58006cf53e42', 
    '603f01546cc1a0006c82b671', 
    '603f01546cc1a0006c82b673', 
    '603f015432ff58006cf53e44', 
    '603f015432ff58006cf53e46', 
    '603f01546cc1a0006c82b675', 
    '603f015432ff58006cf53e48', 
    '603f01546cc1a0006c82b677', 
    '603f01546cc1a0006c82b679', 
    '603f01546cc1a0006c82b67b', 
    '603f015432ff58006cf53e4a', 
    '603f015432ff58006cf53e4c'
]

const total = lotes.length
var progresso = 0

const consultaSL = async (lote) => {
    const request = {
        "url" : `https://contabil-sl.cloud.betha.com.br/contabil/service-layer/v2/api/lotes/${lote}`,
        "method" : "get",
        "headers" : headers
    }
    try{
        const result = await axios(request)
        for(sl of result.data.retorno){
            switch(sl.status) {
                case "SUCESSO": processamento.sucesso++ ;break;
                default:
                    processamento.naoProcessado.total++
                    processamento.naoProcessado.lotes.push(sl)
            }
            progresso++
            console.log(`Processando ${progresso} de ${total}..`)
        }
    }catch(e){
        console.log(">>> ERROR <<<");
    }
}

(async () => {
    for(it of lotes){
        await consultaSL(it)
    }
    console.log(JSON.stringify(processamento));
})();
