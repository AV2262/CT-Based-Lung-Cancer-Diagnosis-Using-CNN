// Simulating a prediction and adding interactivity
/*
document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Display loading effect (optional enhancement)
    document.getElementById("result-section").classList.remove("hidden");
    document.getElementById("prediction").textContent = "Adenocarcinoma"; // Replace with model prediction
    document.getElementById("confidence").textContent = "92%"; // Replace with model confidence score
});

// Download report button action
document.getElementById("download-report").addEventListener("click", function () {
    const prediction = document.getElementById("prediction").textContent;
    const confidence = document.getElementById("confidence").textContent;

    // Create a downloadable report
    const report = `
        Lung Cancer Detection Report\n
        Prediction: ${prediction}\n
        Confidence: ${confidence}\n
        Thank you for using our service!
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Lung_Cancer_Report.txt";
    link.click();
});
*/

// new
/*
document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("fileUpload");

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    for (let file of fileInput.files) {
        formData.append("files", file);  // Append each file
    }

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server Response:", data);
        document.getElementById("prediction").textContent = data; // Display prediction
        document.getElementById("result-section").classList.remove("hidden");
    })
    .catch(error => console.error("Error:", error));
});

// Download report button action
document.getElementById("download-report").addEventListener("click", function () {
    const prediction = document.getElementById("prediction").textContent;

    const report = `
        Lung Cancer Detection Report\n
        Prediction: ${prediction}\n
        Thank you for using our service!
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Lung_Cancer_Report.txt";
    link.click();
});
*/


//---------------------------------------------
// Handle form submission and file upload
document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("fileUpload");

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    formData.append("files", fileInput.files[0]); // Ensure only one file is sent

    // Send file to Flask backend for processing
    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())  // Expect JSON response
    .then(data => {
        console.log("Server Response:", data);

        if (data.error) {
            alert(`Error: ${data.error}`);
            return;
        }

        // Display prediction results
        document.getElementById("result-section").classList.remove("hidden");
        document.getElementById("prediction").textContent = data.prediction;
        document.getElementById("confidence").textContent = data.confidence; // Display confidence score
    })
    .catch(error => console.error("Error:", error));
});
//--------------------------------------------------

// Handle report download
/*document.getElementById("download-report").addEventListener("click", function () {
    const prediction = document.getElementById("prediction").textContent;
    const confidence = document.getElementById("confidence").textContent;

    const report = `Lung Cancer Detection Report\n\nPrediction: ${prediction}\nConfidence: ${confidence}\n\nThank you for using our service!`;

    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Lung_Cancer_Report.txt";
    link.click();
});*/
// Handle report download
// Handle report download
document.getElementById("download-report").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    //CHANGES----
    const patientName = document.getElementById("patientName").value || "N/A";
    const patientId = document.getElementById("patientID").value || "N/A";
    //------

    const prediction = document.getElementById("prediction").textContent;
    const confidence = document.getElementById("confidence").textContent;
    const date = new Date().toLocaleString();

    // Set Report Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MEDICAL IMAGING REPORT", 70, 20);
    doc.text("LUNG CANCER DIAGNOSTIC EVALUATION", 55, 30);

    // Patient Information Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information:", 15, 45);
    doc.setFont("helvetica", "normal");

    doc.text(`Patient Name      : ${patientName}`, 15, 55);
    doc.text(`Patient ID        : ${patientId}`, 15, 63);

    doc.text(`Date of Examination : ${date}`, 15, 71);
    doc.text("Scan Type        : Computed Tomography (CT)", 15, 79);
    doc.text("Status           : Processed Successfully", 15, 87);

    // Radiology Findings Section
    doc.setFont("helvetica", "bold");
    doc.text("RADIOLOGY FINDINGS", 15, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Diagnosis        : ${prediction}`, 15, 110);
    doc.text(`Confidence Level : ${confidence}`, 15, 118);
    doc.text("Imaging Analysis:", 15, 126);
    doc.text("- The AI-based system has processed the CT scan.", 20, 134);
    doc.text("- Analysis suggests the presence of lung abnormalities.", 20, 142);
    doc.text("- Further clinical evaluation is advised.", 20, 150);

    // Recommendations Section ✔
    doc.setFont("helvetica", "bold");
    doc.text("RECOMMENDATIONS", 15, 165);
    doc.setFont("helvetica", "normal");
    doc.text("> Further radiological assessments, such as PET or MRI, are advised.", 15, 175);
    doc.text("> Clinical correlation with biopsy and histopathology is recommended.", 15, 183);
    doc.text("> Consultation with an oncologist or pulmonologist is necessary.", 15, 191);
    doc.text("> Immediate medical attention is required if symptoms persist.", 15, 199);

    // Conclusion Section
    doc.setFont("helvetica", "bold");
    doc.text("CONCLUSION", 15, 215);
    doc.setFont("helvetica", "normal");
    doc.text("- This is an AI-generated preliminary report based on deep-learning analysis.", 15, 225);
    doc.text("- It should not be considered a definitive diagnosis.", 15, 233);
    doc.text("- A certified radiologist or medical professional must validate these findings.", 15, 241);


    // Confidential Footer    
	const pageWidth = doc.internal.pageSize.getWidth(); // Get page width
	// Center align "CONFIDENTIAL MEDICAL REPORT"
	doc.setFont("helvetica", "bold");
	const titleText = "CONFIDENTIAL MEDICAL REPORT";
	const titleX = (pageWidth - doc.getTextWidth(titleText)) / 2;
	doc.text(titleText, titleX, 260);
	// Center align the disclaimer text
	doc.setFont("helvetica", "normal");
	const disclaimerText = "This report is generated for diagnostic purposes only.";
	const disclaimerX = (pageWidth - doc.getTextWidth(disclaimerText)) / 2;
	doc.text(disclaimerText, disclaimerX, 268);


    // Save the PDF
    doc.save(`Lung_Cancer_Report_${date.replace(/[\s:/]/g, "_")}.pdf`);
});
