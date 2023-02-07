const express = require("express");
const Controller = require("../controllers/Contact.controller");

const router = express.Router();

router.post("/createContact", Controller.CreateContact);
router.post("/updateContact", Controller.UpdateContact);
router.post("/getContact", Controller.GetContact);
router.post("/deleteContact", Controller.DeleteContact);

module.exports = router;
