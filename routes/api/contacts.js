const express = require("express");
const Joi = require("joi");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
