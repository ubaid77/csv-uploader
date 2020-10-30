const express = require("express");
const router = express.Router();

const { uploadInvoices, getInvoices } = require("../invoices");

router.route("/import").get(uploadInvoices);
router.route("/view-data").get(getInvoices);

module.exports = router;
