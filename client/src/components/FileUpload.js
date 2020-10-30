import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import InvoiceUploadOption from "./InvoiceUploadOption";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPrecentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        "https://quiet-bastion-15558.herokuapp.com/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round(progressEvent.loaded * 100) / progressEvent.total
              )
            );
            setTimeout(() => setUploadPercentage(0), 2000);
          }

          //clear percentage
        }
      );
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setFile("");
      setFilename("");
      setMessage("File Uploaded");
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setMessage("server problem");
      } else {
        setMessage(error.response.data.message);
      }
      setTimeout(() => window.location.reload(false), 3000);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPrecentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {message ? <Message message={message} /> : null}
      {uploadedFile.fileName ? (
        <InvoiceUploadOption uploadedFileName={uploadedFile} />
      ) : null}
    </Fragment>
  );
}

export default FileUpload;
