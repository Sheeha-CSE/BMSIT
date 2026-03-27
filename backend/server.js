const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let registrations = [];

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/register", (req, res) => {
  const data = req.body;
  registrations.push(data);
  res.json({ message: "Registered successfully" });
});

app.get("/registrations", (req, res) => {
  res.json(registrations);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});