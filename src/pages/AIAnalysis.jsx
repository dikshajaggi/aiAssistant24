import React, { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

const AiAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

    //   const res = await analyzeDentalDisease(formData);
    //   setReport(res.data); // expect: { pdf_url, findings:[], summary:"..." }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start">

      {/* Page Heading */}
      <div className="p-4 border-b bg-secondary1/5">
        <h1 className="text-xl font-semibold mb-4">AI Disease Analysis</h1>
        <p className="text-base sm:text-base text-gray-600 mt-2">
          Upload a photo of the affected area and let AI generate a clinical analysis report.
        </p>
      </div>

        <p className="text-red-500 mt-2">*For training and decision-support purposes only. This AI analysis is designed to assist clinical judgment and patient communication, not replace a qualified doctor’s diagnosis or feedback.</p>

      {/* Upload + Analyze Section */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-5 space-y-5 border">

          {/* Image Upload Box */}
          <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50">
            <UploadCloud size={32} className="text-secondary1 mb-2" />
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WEBP</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-3 text-xs sm:text-sm cursor-pointer file:cursor-pointer file:bg-secondary1 file:text-white file:px-3 file:py-1 file:rounded-lg file:border-0"
            />
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-4 w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border shadow-sm"
              />
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full cursor-pointer bg-secondary1 text-white py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Analyze & Generate Report"}
          </button>
        </div>

        {/* Report Preview Section */}
        {report && (
          <div className="w-full max-w-3xl mt-6">
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border">

              {/* Stats */}
              <div className="flex flex-wrap justify-between gap-2 text-xs sm:text-sm mb-3">
                <span className="px-2 py-1 bg-alert/10 text-alert rounded-lg">
                  Total Findings: {report.findings?.length || 0}
                </span>
                <span className="px-2 py-1 bg-secondary1/10 text-secondary1 rounded-lg">
                  Report Generated At: {new Date().toLocaleString()}
                </span>
              </div>

              {/* Findings Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {report.findings?.map((f, i) => (
                  <div key={i} className="rounded-xl border p-3 shadow-sm">
                    <h3 className="font-semibold text-sm">{f.condition}</h3>
                    <p className="text-xs text-gray-600 mt-1">{f.observation}</p>
                    <p className="text-xs font-medium mt-2 text-alert">{f.severity}</p>
                  </div>
                ))}
              </div>

              {/* Clinical Summary */}
              <div className="mt-4 bg-secondary1/10 text-secondary1 p-3 rounded-xl text-sm font-medium">
                {report.summary}
              </div>

              {/* Download PDF */}
              {report.pdf_url && (
                <button
                  onClick={() => window.open(report.pdf_url, "_blank")}
                  className="mt-4 cursor-pointer flex items-center gap-2 text-xs sm:text-sm bg-secondary1 text-white px-3 py-2 rounded-lg hover:opacity-90"
                >
                  <FileText size={14} /> View/Download Full Report
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAnalysis;
