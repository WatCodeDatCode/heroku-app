require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("It works!");
});

app.get("/api/employees", (req, res) => {
  connection.query(`SELECT * FROM employees`, (error, result) => {
    res.json(result);
  });
});

app.get("/api/employee/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    `SELECT * FROM employees WHERE employeeNumber = ?`,
    [id],
    (error, result) => {
      if (error) {
        res.json({
          status: "error",
          description: "error, try again later",
        });
      }

      res.json(result);
    }
  );
});

app.get("/api/office/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  connection.query(
    `SELECT * FROM offices WHERE officeCode = ?`,
    [id],
    (error, result) => {
      if (error) {
        res.json({
          status: "error",
          description: "error, try again later",
        });
      }

      res.json(result);
    }
  );
});

app.post("/employees/new", (req, res) => {
  const employee = req.body;
  const employeeNumber = employee.employeeNumber;
  const lastName = employee.lastName;
  const firstName = employee.firstName;
  const email = employee.email;
  const jobTitle = employee.jobTitle;
  const extension = employee.extension;
  const officeCode = employee.officeCode;
  const reportsTo = employee.reportsTo;

  connection.query(
    `INSERT INTO employees 
    (employeeNumber, lastName, firstName, email, jobTitle, extension, officeCode, reportsTo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      employeeNumber,
      lastName,
      firstName,
      email,
      jobTitle,
      extension,
      officeCode,
      reportsTo,
    ],
    (error, result) => {
      if (error) {
        console.log(error);

        res.json({
          status: "error",
          description: error.sqlMessage,
        });
      } else {
        res.json({
          status: "success",
          description: "Employee added successfully",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
