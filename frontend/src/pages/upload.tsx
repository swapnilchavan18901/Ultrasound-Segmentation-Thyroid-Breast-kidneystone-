import React, { useState } from "react";
import "../css/upload.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [disease, setDisease] = useState([]);
  const navigated = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("disease", disease);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/results",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      navigated("/reports");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="upload-container">
        <h1>Upload Ultrasound Image</h1>
        <select
          id="analysisType"
          onChange={(e) => {
            setDisease(e.target.value);
          }}
        >
          <option value="">Select Analysis Type</option>
          <option value="thyroid">Thyroid</option>
          <option value="breast">Breast</option>
          <option value="kidneystone">Kidneystone</option>
        </select>
        <input
          type="file"
          id="imageInput"
          accept="image/jpeg, image/png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
