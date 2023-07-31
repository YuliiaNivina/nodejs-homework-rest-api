const { Contact, schemas } = require("../models/contact");
const ResultError = require("../utils/ResultError");
const ctrlWrapper = require("../utils/ctrlWrapper");

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw ResultError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.joiSchema.validate(req.body);
  if (error) {
    throw ResultError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = schemas.joiSchema.validate(req.body);
  if (error) {
    throw ResultError(400, "missing required name field");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw ResultError(404, "Not found");
  }
  res.json(result);
};

const updateFavoriteContact = async (req, res) => {
  const { error } = schemas.updateFavoriteShema.validate(req.body);
  if (error) {
    throw ResultError(400, "missing field favorite");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw ResultError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw ResultError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
  deleteContact: ctrlWrapper(deleteContact),
};
