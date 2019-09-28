const mysql = require("mysql");
const database = "infoPizza";

module.exports = () => {

	const connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "root",
			database
		});

	return connection;
}