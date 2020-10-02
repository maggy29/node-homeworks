const path = require("path");
const fs = require("fs");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath);
    return JSON.parse(data);
  } catch (e) {
    console.error("listContacts error", e);
  }
}

async function getContactById(contactId) {
  try {
    if (contactId.length <= 2) {
      contactId = parseInt(contactId);
    }

    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find(({ id }) => id === contactId);
    return contactById;
  } catch (e) {
    console.error("removeContact error", e);
  }
}

async function removeContact(contactId) {
  try {
    if (contactId.length <= 2) {
      contactId = parseInt(contactId);
    }
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsFilter = contacts.filter(({ id }) => id !== contactId);
    const contactsAfterDelete = await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(contactsFilter)
    );
    return contactsAfterDelete;
  } catch (e) {
    console.error("removeContact error", e);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: uuid(), name, email, phone };
    const contactsAfterAdd = [...contacts, newContact];
    await fs.promises.writeFile(contactsPath, JSON.stringify(contactsAfterAdd));
    return newContact;
  } catch (e) {
    console.error("addContact error", e);
  }
}

async function updateContact(contactId, requestBody) {
  try {
    if (contactId.length <= 2) {
      contactId = parseInt(contactId);
    }
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactIndexById = contacts.findIndex(({ id }) => id === contactId);
    contacts[contactIndexById] = {
      ...contacts[contactIndexById],
      ...requestBody,
    };
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndexById];
  } catch (e) {
    console.error("addContact error", e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
