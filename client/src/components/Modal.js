import React from "react";
import axios from "axios";
import loader from "../Loader/loader.svg";
function Modal({
  title,
  totalSum,
  totalValidInvoices,
  totalInvalidInvoices,
  totalVendors,
  error,
  loading
}) {
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://quiet-bastion-15558.herokuapp.com/api/invoices/view-data"
      );
      console.log(response.data);
      console.log(totalVendors);
      alert("check console");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          {title}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="container">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <img className="text-center" src={loader} alt="loading" />
            </div>
          ) : (
            <p>
              <div className="data">
                <strong>No. of Invoice Uploaded: </strong>
                <span style={{ color: "#218838" }}>{totalValidInvoices}</span>
              </div>

              <div className="data">
                <strong>No. of Invalid Invoices: </strong>
                <span style={{ color: "#C82333" }}>{totalInvalidInvoices}</span>
              </div>
              <div className="data">
                <strong>Total no. of vendors: </strong>
                <span style={{ color: "#C82333" }}>{totalVendors}</span>
              </div>

              <div className="data">
                <strong>Sum of Invoice Amount: </strong>
                <span style={{ color: "#138496" }}>{totalSum}</span>
              </div>
            </p>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => window.location.reload(false)}
        >
          Close
        </button>
        <button
          data-dismiss="modal"
          onClick={onClick}
          type="button"
          className="btn btn-primary"
        >
          View Data
        </button>
      </div>
    </>
  );
}

export default Modal;
