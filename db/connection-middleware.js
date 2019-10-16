const connectionFactory = require("./connection-factory");

module.exports = (req, res, next) => {
	console.log("Abrindo conexao...");
	req.connection = connectionFactory();
	next(); 
	
	req.connection.end(() => console.log("Conexao fechada."));
}