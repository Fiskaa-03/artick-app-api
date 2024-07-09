const { DataTypes } = require("sequelize");
const { sequelize: db } = require("./index");

const User = db.define(
	"user",
	{
		username: DataTypes.STRING,
		fullname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.ENUM("PENGGUNA", "MITRA"),
		telephone: DataTypes.STRING,
	},
	{
		freezeTableName: true,
	}
);

module.exports = User;

(async () => {
	await db.sync();
})();
