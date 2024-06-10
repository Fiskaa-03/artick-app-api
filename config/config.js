require("dotenv").config();

module.exports = {
	development: {
		username: "root",
		password: "!Simple123",
		database: "artick_db",
		host: "127.0.0.1",
		dialect: "mariadb",
		port: 3308,
	},
	test: {
		username: "root",
		password: null,
		database: "artick_db_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		port: process.env.DB_PORT,
	},
};
