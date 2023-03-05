const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const db = lowDb(new FileSync("db.json"));
db.defaults({ notes: [], name: [] }).write();

const app = express();

// requests of content-type - application/json
app.use(express.json());

// requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));

const PORT = 3131;

// Routes

// initial GET endpoint
app.get("/", (request, response) => {
    response.json({ message: "Initial endpoint" });
  });
//  GET
app.get("/notes", (request, response) => {
    const data = db.get("notes").value();
    return response.json(data);
});

//  POST
app.post("/notes/new", (request, response) => {
    const note = request.body
    db.get("notes").push({
        ...note, id: nanoid()
    }).write()
    response.json({ success: true })
})

app.listen(PORT, () => {
    console.log(`Running on localhost:$(PORT)`)
})