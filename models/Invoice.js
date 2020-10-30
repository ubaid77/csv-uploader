const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    trim: true,
    required: [true, "Invoice no. not found"],
    unique: true
  },
  documentNumber: {
    type: String,
    required: [true, "Document no. not found"]
  },
  type: {
    type: String
  },
  netDueDate: {
    type: String
  },
  docDate: {
    type: String,
    required: [true, "Doc Date not found"]
  },
  pstngDate: {
    type: String,
    required: true
  },
  amtInLocCur: {
    type: String,
    required: [true, "Amount not found"]
  },
  vendorCode: {
    type: String,
    required: true
  },
  vendorName: {
    type: String,
    required: [true, "Vendor name is required"]
  },
  vendorType: {
    type: String,
    required: [true, "Vendor type is required"]
  }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
