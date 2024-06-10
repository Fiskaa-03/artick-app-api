const EventController = require("../controllers/EventController");
const express = require("express");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/event", EventController.createEvent);
router.get("/events", EventController.getAllEventData);
router.get("/event/:id", EventController.getEventDataByID);

module.exports = router;
