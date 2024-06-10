const { where } = require("sequelize");
const Event = require("../models/EventModel");

class EventController {
	static getAllEventData = async (req, res) => {
		try {
			const response = await Event.findAll();
			res.status(200).json(response);
		} catch (error) {
			console.log(error.message);
		}
	};

	static getEventDataByID = async (req, res) => {
		try {
			const response = await Event.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			console.log(error.message);
		}
	};

	static createEvent = async (req, res) => {
		try {
			const createdEvent = {
				eventName: req.body.eventName,
				description: req.body.description,
				price: req.body.price,
				place: req.body.place,
			};
			await Event.create(createdEvent);
			res.status(201).json({ msg: "Event Created" });
		} catch (error) {
			console.log(error.message);
		}
	};
}
module.exports = EventController;
