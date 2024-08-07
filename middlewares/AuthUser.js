const User = require("../models/UserModel.js");

const verifyUser = async (req, res, next) => {
	console.log("😊😊", req.session.userId);
	if (!req.session.userId) {
		return res.status(401).json({ msg: "Mohon login ke akun anda" });
	}

	const user = await User.findOne({
		where: {
			id: req.session.userId,
		},
	});

	if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
	req.userId = user.id;
	req.role = user.role;

	next();
};

module.exports = { verifyUser };
