require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/courses", async (req, res) => {
  const course = await prisma.course.create({
    data: req.body,
  });

  res.status(201).json(course);
});

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/courses", async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});