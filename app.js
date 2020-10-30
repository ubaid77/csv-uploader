const express = require("express");
const expressFileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const connetDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connetDB();

const invoices = require("./routes/invoice");
const fileUpload = require("./fileUpload");

const app = express();

app.use(expressFileUpload());

app.use("/api/file", fileUpload);
app.use("/api/invoices", invoices);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started ${PORT}`));
