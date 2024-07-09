const User = require("../models/UserModel");
const argon2 = require("argon2");

class UserController {
	static getAllUserData = async (req, res) => {
		try {
			const response = await User.findAll();
			res.status(200).json(response);
		} catch (error) {
			console.log(error.message);
		}
	};

	static Register = async (req, res) => {
		const {
			username,
			fullname,
			email,
			password,
			confPassword,
			role,
			telephone,
		} = req.body;

		if (password !== confPassword)
			return res
				.status(400)
				.json({ msg: "Password dan Confirm Password Tidak Cocok" });

		const hashPassword = await argon2.hash(req.body.password);
		try {
			await User.create({
				username,
				fullname,
				email,
				password: hashPassword,
				role,
				telephone,
			});
			res.json({ msg: "Register Berhasil" });
		} catch (error) {
			console.log(error.message);
			res.status(400).json({ msg: "User gagal ditambahkan" });
		}
	};

	static Login = async (req, res) => {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) return res.status(404).json({ msg: "Account tidak ditemukan" });

		const match = await argon2.verify(user.password, req.body.password);
		if (!match) return res.status(400).json({ msg: "Wrong password" });

		req.session.userId = user.id;

		const { id, userId, fullname, email, role } = user;
		res.status(200).json({ id, userId, fullname, email, role });
	};

	static Logout = async (req, res) => {
		req.session.destroy((err) => {
			if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
			res.status(200).json({ msg: "Anda telah logout" });
		});
	};

	static Me = async (req, res) => {
		if (!req.session.userId) {
			return res
				.status(401)
				.json({ msg: "Mohon melakukan login terlebih dahulu" });
		}

		const user = await User.findOne({
			where: {
				id: req.session.userId,
			},
		});

		if (!user) return res.status(404).json({ msg: "Account tidak ditemukan" });

		res.status(200).json(user);
	};
}
module.exports = UserController;
