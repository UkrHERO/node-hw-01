const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
}

async function getContactById(id) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => data.filter((contact) => +contact.id === id))
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);
    parseData.push({ name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(parseData));
    return parseData;
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(id) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const newData = parseData.filter(
      (contact) => Number.parseInt(contact.id) !== id
    );
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    return newData;
  } catch (err) {
    return console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
