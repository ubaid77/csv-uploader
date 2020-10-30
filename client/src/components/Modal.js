import React from "react";
import loader from "../Loader/loader.svg";
function Modal({
  title,
  totalSum,
  totalValidInvoices,
  totalInvalidInvoices,
  error,
  loading
}) {
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
        {/* <a href="/invoices/view-data" target="_blank">
          <button type="button" className="btn btn-primary">
            View Data
          </button>
        </a> */}
      </div>
    </>
  );
}

export default Modal;
