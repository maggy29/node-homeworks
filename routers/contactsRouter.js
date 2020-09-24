const express = require("express");
const errorWrapper = require("../HOC/errorWrapper");
const contactsController = require("./contactsController");

const router = express.Router();

router.get("/", errorWrapper(contactsController.getContacts));
router.get("/:contactId", errorWrapper(contactsController.getContactById));
router.delete("/:contactId", errorWrapper(contactsController.deleteContact));
router.post(
  "/",
  errorWrapper(contactsController.validateContactAdding),
  errorWrapper(contactsController.addContact)
);
router.patch(
  "/:contactId",
  errorWrapper(contactsController.validateContactUpdating),
  errorWrapper(contactsController.updateContact)
);

module.exports = router;
