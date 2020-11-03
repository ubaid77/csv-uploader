import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function InvoiceUploadOption({ uploadedFileName }) {
  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalSumOfInvoices, setTotalSumOfInvoices] = useState(0);
  const [totalInvalidInvoices, setTotalInvalidInvoices] = useState(0);
  const [totalVendors, setTotalVendors] = useState([]);

  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://quiet-bastion-15558.herokuapp.com/api/invoices/import"
      );

      setTitle("Success");

      setTotalInvoices(response.data.validInvoices.length);
      setTotalInvalidInvoices(response.data.invalidInvoices);
      if (response.data.error) {
        setErrors(response.data.error[0].error);
      }
      processData(response.data.validInvoices);
      setLoading(false);
    } catch (error) {
      setTitle("Something went wrong");
      setErrors(error.response.data.error[0].error);

      setLoading(false);
    }
  };

  const processData = (entry) => {
    let lookup = {};
    let result = [];
    if (entry.length > 0) {
      entry.forEach((invoice) => {
        setTotalSumOfInvoices(
          totalSumOfInvoices + parseInt(invoice.amtInLocCur)
        );
        if (!(invoice.vendorName in lookup)) {
          lookup[invoice.vendorName] = 1;
          result.push(invoice.vendorName);
        }
      });
      setTotalVendors(result);
    }
  };
  return (
    <div className="d-flex justify-content-between mt-4 align-items-center">
      <div>
        <h4 className="text-center">{uploadedFileName.fileName}</h4>
      </div>
      <div>
        <button
          onClick={onClick}
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Upload Data
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {loading ? (
              <Modal title={"Loading"} loading={true} />
            ) : (
              <Modal
                title={title}
                totalSum={totalSumOfInvoices}
                totalValidInvoices={totalInvoices}
                totalInvalidInvoices={totalInvalidInvoices}
                totalVendors={totalVendors}
                error={errors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceUploadOption;
