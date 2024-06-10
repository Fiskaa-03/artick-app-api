const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const UserRoute = require("./routes/UserRoute");
const EventRoute = require("./routes/EventRoute.js");

const cors = require("cors");
const mode = process.env.NODE_ENV || "development";
const corsOption = { credentials: true };
corsOption.origin =
	mode === "development"
		? "http://localhost:5173"
		: "https://artick-app.vercel.app/";

const { sequelize: db } = require("./models/index.js");
const models = require("./models");
// const Event = require("./models/EventModel.js");
// const User = require("./models/UserModel.js");
// models.sequelize.sync({ alter: true });
// async function renameColumn() {
// 	await db.query("ALTER TABLE event RENAME COLUMN event_name TO eventName;");
// }

dotenv.config();

const app = express();
const port = process.env.PORT || "5000";

try {
	db.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

app.use(express.json());
app.use(express.static("public"));

app.use(cors(corsOption));
app.use(UserRoute);
app.use(EventRoute);

app.get("/", async (req, res) => {
	res.status(200).send("API delivered successfully");
});

app.listen(port, "0.0.0.0", () => {
	console.log(`Example app listening on port ${port}`);
});
