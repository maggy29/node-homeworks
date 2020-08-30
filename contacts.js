const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    console.table(contacts);
  } catch (e) {
    console.error("listContacts error", e);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const contactById = await contacts.find(({ id }) => id === contactId);
    console.table(contactById);
  } catch (e) {
    console.error("getContactById error", e);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const contactsAfterDelete = await contacts.filter(
      ({ id }) => id !== contactId
    );
    const refreshedData = await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterDelete)
    );
    console.table(contactsAfterDelete);
    return refreshedData;
  } catch (e) {
    console.error("removeContact error", e);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = uuidv4();
    const newContact = { id, name, email, phone };

    const data = await fs.promises.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const contactsAfterAdd = await [...contacts, newContact];
    const refreshedData = await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterAdd)
    );
    console.table(contactsAfterAdd);
    return refreshedData;
  } catch (e) {
    console.error("addContact error", e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
