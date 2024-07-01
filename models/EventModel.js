const { DataTypes } = require("sequelize");
const { sequelize: db } = require("./index");

const Event = db.define(
	"event",
	{
		eventName: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.STRING,
		schedule: {
			type: DataTypes.DATE,
			defaultValue: db.literal("CURRENT_TIMESTAMP"),
		},
		place: DataTypes.STRING,
		category: DataTypes.ENUM("CONCERT", "THEATER", "FILM"),
		poster: DataTypes.STRING,
		link: DataTypes.STRING,
	},
	{
		freezeTableName: true,
	}
);

module.exports = Event;

(async () => {
	await db.sync();
})();
