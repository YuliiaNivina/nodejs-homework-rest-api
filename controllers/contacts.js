const Joi = require("joi");

const contacts = require("../models/contacts");
const ResultError = require("../utils/ResultError");
const ctrlWrapper = require("../utils/ctrlWrapper")

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const getListContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res)=>{
        const { id } = req.params;
        const result = await contacts.getContactById(id);
        if (!result) {
          throw ResultError(404, "Not found");
        }
        res.json(result);
};

const addContact = async(req, res)=>{
        const { error } = addSchema.validate(req.body);
        if (error) {
          throw ResultError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
};

const updateContact = async(req, res)=>{
        const { error } = addSchema.validate(req.body);
        if (error) {
          throw ResultError(400, "missing required name field");
        }
        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
          throw ResultError(404, "Not found");
        }
        res.json(result);
};

const deleteContact = async(req, res)=>{
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
          throw ResultError(404, "Not found");
        }
        res.json({ message: "contact deleted" });
}

module.exports = {
    getListContacts: ctrlWrapper(getListContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContact: ctrlWrapper(deleteContact),
}
