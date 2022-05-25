const xml2js = require('xml2js');
const fs = require('fs');
const {
    arrayToObject,
    getIdentificacaoTransacao,
    getOrigem,
    getPadrao, 
    getLoginSenhaPrestador,
    getDestino,
    getDadosProtocolo,
    getRelacaoGuiasArrays,
    getDadosGuiasArray,
    getDetalhesGuia,
    getDetalhesGuiaArray
} = require('./parserObjectXml');

const ans = "ans:"


    ; (async function main() {
        const dataXml = await getDataXml()
        console.log(dataXml)
    })();


async function getDataXml() {
    const jsonXml = await readXml("data.xml");

    const cabecalho = arrayToObject(jsonXml[`${ans}mensagemTISS`][`${ans}cabecalho`])
    //console.log(cabecalho)
    const identificacaoTransacao = getIdentificacaoTransacao(cabecalho[`${ans}identificacaoTransacao`])
    const origem = getOrigem(cabecalho[`${ans}origem`])
    const padrao = getPadrao(cabecalho[`${ans}Padrao`])
    const loginSenhaPrestador = getLoginSenhaPrestador(cabecalho[`${ans}loginSenhaPrestador`])
    const destino = getDestino(cabecalho[`${ans}destino`])
    //
    const operadoraParaPrestador = arrayToObject(jsonXml[`${ans}mensagemTISS`][`${ans}operadoraParaPrestador`])
    const demonstrativosRetorno = arrayToObject(operadoraParaPrestador[`${ans}demonstrativosRetorno`]);
    const dadosProtocolo = getDadosProtocolo(demonstrativosRetorno[`${ans}demonstrativoAnaliseConta`]);
    const relacaoGuiasArrays = getRelacaoGuiasArrays(dadosProtocolo.relacaoGuiasArray);
    const dadosGuiasArray = getDadosGuiasArray(relacaoGuiasArrays);
    
    for (const iterator of dadosGuiasArray) {
        console.log(iterator.detalhesGuia)
    }

    // for (const iterator of getListaGuias(cabecalho[`${ans}DetalhesGuia`])) {
    //     iterator
    // }
    return { origem, identificacaoTransacao, padrao, loginSenhaPrestador, destino, demonstrativosRetorno, relacaoGuiasArrays, dadosGuiasArray }
    //return "OK";
}

async function readXml(fileName) {
    const promise = await new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        const xml_string = fs.readFileSync(fileName, "utf8");

        parser.parseString(xml_string, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
    });
    return promise;
}

function writeFileLog(nameFile, data) {
    //console.log(prestadores);
    //writeFileLog("xml_hsm.json", JSON.stringify(result, null, 1))//.replace(/ans:/g, ''))
    fs.appendFile(nameFile, data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}


