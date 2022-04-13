
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
    return {loginPrestador, senhaPrestador}
 }

const arrayToObject = function (array) {
    return { ...array }[0]
}

const setObject = function(obj, value) {
    return obj[`${ans}${value}`]
}

module.exports = {arrayToObject, setObject, getOrigem, getIdentificacaoTransacao, getPadrao, getLoginSenhaPrestador};