const fs = require("fs"); // Ekwiwalent `import` w react
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Pobieranie wszystkich kontaktów z bazy
const getContactsFromDb = (err, data) => {
  if (err) {
    console.error("Błąd odczytu pliku contacts.json:", err);
    return;
  }
  return JSON.parse(data);
};

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    console.table(getContactsFromDb(err, data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    const contacts = getContactsFromDb(err, data);
    const foundContact = contacts.find((contact) => contact.id === contactId);
    if (!foundContact) {
      console.log("Nie ma kontaktu o ID: " + contactId);
      return;
    }

    console.table(foundContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    const contacts = getContactsFromDb(err, data); //Tablica wszystkich kontaktów
    const foundContact = contacts.find((contact) => contact.id === contactId); //Znaleziony kontakt do usunięcia
    if (!foundContact) {
      console.log("Nie ma kontaktu o ID: " + contactId);
      return;
    }

    // Filtrujemy obecną listę kontaktów BEZ znalezionego kontaktu - otrzymujemy listę tak jakby z usuniętym kontaktem
    const newContactsList = contacts.filter((contact) => contact.id !== foundContact.id);
    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (err) => {
      if (err) {
        console.error("Nie można zapisać do pliku contacts.json:", err);
        return;
      }
      console.log("Kontakt z ID: " + contactId + " został usunięty!");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    const contacts = getContactsFromDb(err, data);
    const newContact = { name, email, phone };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error("Nie można zapisać do pliku contacts.json:", err);
        return;
      }
      console.log("Kontakt");
      console.log(newContact);
      console.log("został dodany!");
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
