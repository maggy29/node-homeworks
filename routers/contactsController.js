const Joi = require("joi");
const contactsOperations = require("../contacts");
const responseNormalizer = require("../normalizers/responseNormalizer");

class ContactsController {
  get addContact() {
    return this._addContact.bind(this);
  }

  get getContactById() {
    return this._getContactById.bind(this);
  }

  get deleteContact() {
    return this._deleteContact.bind(this);
  }

  get updateContact() {
    return this._updateContact.bind(this);
  }
  async getContacts(req, res, next) {
    const contactList = await contactsOperations.listContacts();
    return res.status(200).json(responseNormalizer(contactList));
  }

  async _getContactById(req, res, next) {
    const contactById = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (!contactById) {
      const error = new Error();
      error.message = "Not found";
      return res.status(404).send(responseNormalizer(error));
    }
    return res.status(200).send(responseNormalizer(contactById));
  }

  async _addContact(req, res, next) {
    const newContact = await contactsOperations.addContact(req.body);
    return res.status(201).send(responseNormalizer(newContact));
  }

  async _deleteContact(req, res, next) {
    const contactById = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (!contactById) {
      const error = new Error();
      error.message = "Not found";
      return res.status(404).send(responseNormalizer(error));
    }
    await contactsOperations.removeContact(req.params.contactId);
    const success = { message: "contact deleted" };
    return res.status(200).send(responseNormalizer(success));
  }

  async _updateContact(req, res, next) {
    console.log(Object.keys(req.body).length);
    if (Object.keys(req.body).length === 0) {
      const error = new Error();
      error.message = "Missing fields";
      return res.status(400).send(responseNormalizer(error));
    }

    const contactById = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (!contactById) {
      const error = new Error();
      error.message = "Not found";
      return res.status(404).send(responseNormalizer(error));
    }

    const updatedContact = await contactsOperations.updateContact(
      req.params.contactId,
      req.body
    );
    res.status(200).send(responseNormalizer(updatedContact));
  }

  validateContactAdding(req, res, next) {
    const contactAddingSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().required(),
      phone: Joi.string().min(5).required(),
    });

    const validationResult = contactAddingSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }

  validateContactUpdating(req, res, next) {
    const contactUpdatingSchema = Joi.object({
      name: Joi.string().min(2),
      email: Joi.string(),
      phone: Joi.string().min(5),
    });

    const validationResult = contactUpdatingSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }
}

module.exports = new ContactsController();
