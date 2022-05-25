
const ans = "ans:"

const getIdentificacaoTransacao =  function (object) {
    console.log("getIdentificacaoTransacao")
    const identificacaoTransacao = arrayToObject(object);
    const tipoTransacao = arrayToObject(identificacaoTransacao[`${ans}tipoTransacao`]);
    const sequencialTransacao = arrayToObject(identificacaoTransacao[`${ans}sequencialTransacao`]);
    const dataRegistroTransacao = arrayToObject(identificacaoTransacao[`${ans}dataRegistroTransacao`]);
    const horaRegistroTransacao = arrayToObject(identificacaoTransacao[`${ans}horaRegistroTransacao`]);

    return { tipoTransacao, sequencialTransacao, dataRegistroTransacao, horaRegistroTransacao };
}

const getOrigem = function (object) {
    console.log("getOrigem")
    const origem = arrayToObject(object);
    const identificacaoPrestador = arrayToObject(setObject(origem, "identificacaoPrestador"));
    const codigoPrestadorNaOperadora = arrayToObject(setObject(identificacaoPrestador, "codigoPrestadorNaOperadora"));

    return { codigoPrestadorNaOperadora, identificacaoPrestador };
}

const getPadrao = function (object){
    console.log("getPadrao")
    const padrao = arrayToObject(object)
    return padrao;
}

const getLoginSenhaPrestador = function (object){
    console.log("getLoginSenhaPrestador")
    const loginSenhaPrestador = arrayToObject(object)
    const loginPrestador = arrayToObject(loginSenhaPrestador[`${ans}loginPrestador`]);
    const senhaPrestador = arrayToObject(loginSenhaPrestador[`${ans}senhaPrestador`]);
    return {loginPrestador, senhaPrestador};
}

const getDadosProtocolo = function (object) {

     console.log("getDadosProtocolo")
     const demonstrativoAnaliseConta = arrayToObject(object);
     const dadosConta = arrayToObject(demonstrativoAnaliseConta[`${ans}dadosConta`]);
     const dadosProtocolo = arrayToObject(dadosConta[`${ans}dadosProtocolo`]);
     const numeroLotePrestador = arrayToObject(dadosProtocolo[`${ans}numeroLotePrestador`]);
     const numeroProtocolo = arrayToObject(dadosProtocolo[`${ans}numeroProtocolo`]);
     const dataProtocolo = arrayToObject(dadosProtocolo[`${ans}dataProtocolo`]);
     const situacaoProtocolo = arrayToObject(dadosProtocolo[`${ans}situacaoProtocolo`]);
     const relacaoGuiasArray = dadosProtocolo[`${ans}relacaoGuias`];

     return { numeroLotePrestador, numeroProtocolo, dataProtocolo, situacaoProtocolo, relacaoGuiasArray }

}

const getRelacaoGuiasArrays = function (array) {
    console.info("getRelacaoGuiasArrays");

    let resultArray = [];

    for (const item of array) {
        let numeroGuiaPrestador = arrayToObject(item[`${ans}numeroGuiaPrestador`]);
        let numeroGuiaOperadora = arrayToObject(item[`${ans}numeroGuiaOperadora`]);
        let nomeBeneficiario = arrayToObject(item[`${ans}nomeBeneficiario`]);
        let numeroCarteira = arrayToObject(item[`${ans}numeroCarteira`]);
        let detalhesGuiaArray = item[`${ans}detalhesGuia`];
        resultArray.push({ numeroGuiaPrestador, numeroGuiaOperadora, nomeBeneficiario, numeroCarteira, detalhesGuiaArray })
    }
    return resultArray

}

const getDetalhesGuia = function (object) {
    const dataRealizacao = arrayToObject(object[`${ans}dataRealizacao`]);
    const rootProcedimento = arrayToObject(object[`${ans}procedimento`])
    const procedimento = {
        codigoTabela: arrayToObject(rootProcedimento[`${ans}codigoTabela`]),
        codigoProcedimento: arrayToObject(rootProcedimento[`${ans}codigoProcedimento`]),
        descricaoProcedimento: arrayToObject(rootProcedimento[`${ans}descricaoProcedimento`])
    }
    const valorInformado = arrayToObject(object[`${ans}valorInformado`]);
    const qtdExecutada = arrayToObject(object[`${ans}qtdExecutada`]);
    const valorProcessado = arrayToObject(object[`${ans}valorProcessado`]);
    const valorLiberado = arrayToObject(object[`${ans}valorLiberado`]);

    const rootRelacaoGlosa = arrayToObject(object[`${ans}relacaoGlosa`])

    let relacaoGlosa = [];
    if(rootRelacaoGlosa != undefined) {
        relacaoGlosa = {
            valorGlosa: arrayToObject(rootRelacaoGlosa[`${ans}valorGlosa`]),
            tipoGlosa: arrayToObject(rootRelacaoGlosa[`${ans}tipoGlosa`])
        }
    } else {
        relacaoGlosa = {
            valorGlosa: arrayToObject([`Sem glosa`]),
            tipoGlosa: arrayToObject([`Sem glosa`])
        }
    }
     
    
    return { dataRealizacao, procedimento, valorInformado, qtdExecutada, valorProcessado, valorLiberado, relacaoGlosa }
}


const getDetalhesGuiaArray = function (array) {
    console.info("getDetalhesGuiaArray");
    let resultArray = [];

    for (const item of array) {
        resultArray.push(getDetalhesGuia(item));
    }
    return resultArray

}

const getDadosGuiasArray = function (array) {
    console.info("getDadosGuiasArray")

    let resultList = []
    for (const item of array) {
        let detalhesGuia = []
        for (const iterator of item.detalhesGuiaArray){
            detalhesGuia.push(getDetalhesGuia(iterator))
        }
        const resultObject = {
            numeroGuiaPrestador: item.numeroGuiaPrestador,
            numeroGuiaOperadora: item.numeroGuiaOperadora,
            numeroCarteira: item.numeroCarteira,
            nomeBeneficiario: item.nomeBeneficiario,
            detalhesGuia: detalhesGuia
        }
        resultList.push(resultObject)

    }

    return resultList;
}




 //for (var valor of Object.keys(object)) {
 //   var relacaoGuias = arrayToObject(dadosProtocolo[`${ans}relacaoGuias`]);    //`${ans}relacaoGuias`
    

     //relacaoGuias[`${ans}nomeBeneficiario`];
 //    console.log(relacaoGuias)

 //}

const getDestino = function (object) {
    console.log("getDestino")
    const destino = arrayToObject(object)
    const registroANS = arrayToObject(destino[`${ans}registroANS`]);
    return { registroANS }
}

const arrayToObject = function (array) {
    return { ...array }[0]
}

const setObject = function(obj, value) {
    return obj[`${ans}${value}`]
}

module.exports = { arrayToObject, setObject, getOrigem, getIdentificacaoTransacao, getPadrao, getLoginSenhaPrestador, getDestino, getDadosProtocolo, getRelacaoGuiasArrays, getDetalhesGuiaArray, getDetalhesGuia, getDadosGuiasArray };
