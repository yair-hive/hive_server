import mysql2 from "mysql2";
import fs from "fs";

const dataSql = fs.readFileSync("./hive.sql").toString();

const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hive",
  multipleStatements: true,
  port: 3306,
});

con.query(dataSql, function () {
  console.log("________ttt_________");
});
