const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Set view engine and views folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route - show form
app.get("/", (req, res) => {
  res.render("form");
});

// POST route - save form data
app.post("/submit", (req, res) => {
  const userData = req.body;
  fs.writeFile("data.json", JSON.stringify(userData, null, 2), (err) => {
    if (err) return res.status(500).send("Error saving data");
    res.redirect("/data");
  });
});

// GET route - display saved data
app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, jsonData) => {
    if (err) return res.status(500).send("Error reading data");
    const parsedData = JSON.parse(jsonData);
    res.render("data", { user: parsedData });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
