const express = require("express");
const router = express.Router();
const expressFileUpload = require("express-fileupload");
const path = require("path");

router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded!" });
  }
  const file = req.files.file;
  if (path.extname(file.name) != ".csv") {
    return res.status(400).json({ message: "Only CSV files supported!" });
  }
  file.mv(`${__dirname}/client/build/invoices/invoice.csv`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `/public/invoices/${file.name}`
    });
  });
});

module.exports = router;
