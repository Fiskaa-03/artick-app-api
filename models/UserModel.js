const { DataTypes } = require("sequelize");
const { sequelize: db } = require("./index");

const User = db.define(
	"user",
	{
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.ENUM("PENGGUNA", "MITRA"),
	},
	{
		freezeTableName: true,
	}
);

module.exports = User;

(async () => {
	await db.sync();
})();
