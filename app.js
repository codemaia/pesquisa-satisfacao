const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const oracledb = require('oracledb');
oracledb.autoCommit = true; //commita query;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//--- Connect Database



const dbConfig = {
    user: "<USUARIO_BANCO>",
    password: "<SENHA_BANCO>",
    connectString: "<STRING_CONEXAO>",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0

};



// --- CRUD 

app.get('/find', (req, res) => {
    let users = new Array();
    let connection;
    oracledb.getConnection(dbConfig)
    .then((c) => {
        connection = c;
        return connection.execute("select cd_pessoa_fisica,nm_pessoa_fisica from tasy.pessoa_fisica where cd_pessoa_fisica = 46");
    })
    .then((result) => {
        result.rows.forEach((elemento) => {
            let user = new Object();
            user.id = elemento[0];
            user.nome = elemento[1];
            users.push(user);
        });
        res.status(200).json(users);
    }).then(() => {
        if(connection) {
            connection.close();
        }
    }).catch((error) => {
        res.status(500).json({ message: error.message || "Some error occurred!" });
    });
});





app.get('/find/:userId', (req, res) => {
    let connection;
    let user = new Object();
    oracledb.getConnection(dbConfig)
    .then((c) => {
        connection = c;
        return connection.execute("select nm_pessoa_fisica from tasy.pessoa_fisica where cd_pessoa_fisica = :id", {
            id : req.params.userId
        });
    })
    .then((result) => {
        result.rows.forEach((elemento) => {
            user.id = elemento[0];
            user.nome = elemento[1];
        });
        res.status(200).json(user);
    }).then (() => {
        if(connection){
            connection.close();
        }
    }).catch((error) => {
        res.status(500).json( { message: error.message || "Some error occurred!" } );
    });
});









//--------------------------------

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})
