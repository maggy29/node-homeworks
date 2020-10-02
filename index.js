// const argv = require("yargs").argv;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routers/contactsRouter");

const app = express();
const PORT = 3001;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.listen(PORT, (err) => {
  err ? console.error(err) : console.info(`server started at port ${PORT}`);
});

// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       contacts.listContacts();
//       break;

//     case "get":
//       contacts.getContactById(id);
//       break;

//     case "add":
//       contacts.addContact(name, email, phone);
//       break;

//     case "remove":
//       contacts.removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
