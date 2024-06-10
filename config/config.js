module.exports = {
	development: {
		username: "root",
		password: null,
		database: "artick_db",
		host: "127.0.0.1",
		dialect: "mariadb",
		port: 3307,
	},
	test: {
		username: "root",
		password: null,
		database: "artick_db_test",
		host: "127.0.0.1",
		dialect: "mariadb",
	},
	production: {
		username: "root",
		password: null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
