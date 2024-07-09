const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const sequelizeStore = require("connect-session-sequelize");

const UserRoute = require("./routes/UserRoute");
const EventRoute = require("./routes/EventRoute.js");

const cors = require("cors");
const mode = process.env.NODE_ENV || "development";
const corsOption = { credentials: true };
corsOption.origin =
	mode === "development" ? "http://localhost:5173" : "https://artick.id";

const { sequelize: db } = require("./models/index.js");
const models = require("./models");
// models.sequelize.sync({ alter: true });

dotenv.config();

const app = express();
const port = process.env.PORT || "5000";

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
	db: db,
});

try {
	db.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

app.get("/", async (req, res) => {
	res.status(200).send("API delivered successfully");
});

app.enable("trust proxy");

app.use(
	session({
		secret: process.env.SESS_SECRET,
		resave: false,
		saveUninitialized: true,
		proxy: true,
		cookie: {
			secure: "auto",
			sameSite: "none",
		},
		store: store,
	})
);

app.use(express.json());
app.use(express.static("public"));

app.use(cors(corsOption));
app.use(UserRoute);
app.use(EventRoute);

store.sync();

app.listen(port, "0.0.0.0", () => {
	console.log(`Example app listening on port ${port}`);
});
