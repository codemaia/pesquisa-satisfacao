const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser({ attrkey: "ATTR" });


let xml_string = fs.readFileSync("data.xml", "utf8");

parser.parseString(xml_string, function(error, result) {
    if(error === null) {
        
        //console.log(JSON.stringify(result, null, 1));  
        resultado = JSON.stringify(result, null, 1);

        resultadoObjeto = JSON.parse(resultado);
        console.log(resultadoObjeto);

    }
    else {
        console.log("DEU RUIM");
    }
});




