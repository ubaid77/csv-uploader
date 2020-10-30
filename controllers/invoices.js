const csv = require("fast-csv");
const fs = require("fs");

const Invoices = require("../models/Invoice");

const messages = [];

function isValid(invoices) {
  let flag = 0;
  invoices.forEach((invoice) => {
    if (isFutureDate(invoice.docDate)) {
      messages.push({ error: "Document Date cannot be future Date" });
      flag = 1;
    }
  });
  if (flag == 0) {
    return true;
  } else {
    return false;
  }
}

function isFutureDate(idate) {
  var today = new Date().getTime(),
    idate = idate.split("/");

  idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
  return today - idate < 0 ? true : false;
}

//@desc upload csv data to database
exports.uploadInvoices = (req, res, next) => {
  const csvfile = __dirname + "../client/public/invoices/invoice.csv";
  const stream = fs.createReadStream(csvfile);
  let invoices = [];
  let csvStream = csv
    .parse()
    .on("data", function (data) {
      invoices.push({
        invoiceNumber: data[0],
        documentNumber: data[1],
        type: data[2],
        netDueDate: data[3],
        docDate: data[4],
        pstngDate: data[5],
        amtInLocCur: data[6],
        vendorCode: data[7],
        vendorName: data[8],
        vendorType: data[9]
      });
    })
    .on("end", function () {
      invoices.shift();
      //   console.log(invoices);
      if (isValid(invoices)) {
        Invoices.insertMany(invoices, { ordered: false }, function (
          error,
          inserted
        ) {
          if (error) {
            if (error.name === "ValidationError") {
              messages = Object.values(error.errors).map((val) => val.message);

              return res.status(400).json({
                success: false,
                error: messages,
                validInvoices: [],
                invalidInvoices: 0
              });
            } else if (error.code === 11000 || error.code === 11001) {
              messages.push({
                error: "Duplicate Invoices found are not uploaded"
              });
              return res.status(201).json({
                success: true,
                error: messages,
                validInvoices: error.insertedDocs,
                invalidInvoices: invoices.length - error.insertedDocs.length
              });
            } else {
              messages.push({ error: "Something went wrong" });
              return res.status(500).json({
                success: false,
                error: messages,
                validInvoices: [],
                invalidInvoices: 0
              });
            }
          } else {
            res.status(201).json({
              success: true,
              validInvoices: inserted,
              invalidInvoices: 0
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          error: messages,
          validInvoices: [],
          invalidInvoices: 0
        });
      }
    });
  stream.pipe(csvStream);
  fs.unlinkSync(csvfile);
};

//@desc Get all invoices
exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoices.find();
    return res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
