const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.getListContacts);

router.get("/:id", authenticate, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.put("/:id", authenticate, ctrl.updateContact);

router.patch("/:id/favorite", authenticate, ctrl.updateFavoriteContact);

router.delete("/:id", authenticate, ctrl.deleteContact);

module.exports = router;
