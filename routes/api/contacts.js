const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateContact);

router.patch("/:id/favorite", ctrl.updateFavoriteContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
