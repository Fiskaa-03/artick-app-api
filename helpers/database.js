const mariadb = require("mariadb");
const { Sequelize } = require("sequelize");
// const pool = mariadb.createPool({
// 	host: "127.0.0.1",
// 	user: "root",
// 	password: null,
// 	database: "campus",
// 	connectionLimit: 100,
// 	port: 3307,
// });
// pool.getConnection((err, connenction) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	if (connenction) {
// 		connenction.release();
// 	}
// 	return;
// });

const db = new Sequelize("campus", "root", "", {
	host: "127.0.0.1",
	dialect: "mariadb",
	port: 3307,
});

module.exports = db;
