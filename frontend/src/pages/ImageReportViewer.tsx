import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/reportViewer.css'

const ImageReportViewer = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/api/results/${localStorage.getItem('reportId')}`,{headers:{Authorization:`Bearer ${localStorage.getItem("authToken")}`}}); // Replace with your backend URL
                setReports(response.data.data);
                console.log(response)
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);


    return (
        <div className="container flex-column">
            <h1 className="title">Image Reports</h1>
            <div className="report-grid">
                {reports&&reports ? (
                    <div className="report-item">
                    <div className="images">
                        <div className="image-container">
                            <img
                                src={reports?.originalImage}
                                alt="Original"
                                className="image"
                            />
                            <p className="image-label">Original Image</p>
                        </div>
                        <div className="image-container">
                            <img
                                src={reports?.processedImage}
                                alt="Processed"
                                className="image"
                            />
                            <p className="image-label">Processed Image</p>
                        </div>
                    </div>
                    <div className="report-details">
                        <p>
                            <strong>Findings:</strong> {reports.className}
                        </p>
                        <p>
                            <strong>Confidence:</strong> {parseInt(reports?.confidence*100) }%
                        </p>
                    </div>
                </div>
                ) : (
                    <p className="no-reports">No reports available.</p>
                    )}
            
            </div>
        </div>
    );
};

export default ImageReportViewer;
