"use client";

import { useState } from "react";
import { uploadDataset } from "../lib/api";

export default function DatasetPage() {

  const [fileName, setFileName] = useState<string | null>(null);
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0];

      setDatasetFile(file);
      setFileName(file.name);
      setMessage(null);
      setSuccess(false);

    }

  };

  const handleUploadDataset = async () => {

    if (!datasetFile) {
      setMessage("Please select a dataset ZIP file first.");
      return;
    }

    try {

      setLoading(true);
      setMessage(null);

      const res = await uploadDataset(datasetFile);

      setMessage(res.message || "Dataset uploaded successfully.");
      setSuccess(true);

    } catch (error) {

      console.error(error);
      setMessage("Dataset upload failed. Please check your dataset format.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-white px-6 py-20">

      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Dataset Configuration
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a structured dataset to train the face recognition model.
            Each identity must contain multi-view facial images.
          </p>
        </div>

        {/* REQUIREMENTS CARD */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 mb-12">

          <h2 className="text-2xl font-semibold mb-6">
            Dataset Requirements
          </h2>

          <ul className="space-y-4 text-gray-400">

            <li>✔ Minimum 3 images per person (Front, Left, Right)</li>
            <li>✔ JPG or PNG image formats supported</li>
            <li>✔ Images should contain clear facial visibility</li>
            <li>✔ Consistent lighting improves recognition accuracy</li>
            <li>✔ Each person must have a separate folder</li>
            <li>✔ Folder name should represent the person's identity</li>
            <li>✔ Upload the entire dataset as a ZIP file</li>

          </ul>

          {/* FILE STRUCTURE */}
          <div className="mt-10 bg-black/40 border border-white/10 rounded-2xl p-6">

            <h3 className="text-lg font-semibold mb-6 text-white">
              Expected Folder Structure
            </h3>

            <div className="space-y-3 text-gray-300 text-sm">

              <div className="flex items-center gap-2">
                <span>📦</span>
                <span className="font-medium">dataset.zip</span>
              </div>

              <div className="ml-6 space-y-2">

                <div className="flex items-center gap-2">
                  <span>📁</span>
                  <span className="font-medium">person_1</span>
                </div>

                <div className="ml-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>front.jpg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>left.jpg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>right.jpg</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span>📁</span>
                  <span className="font-medium">person_2</span>
                </div>

                <div className="ml-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>front.jpg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>left.jpg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🖼️</span>
                    <span>right.jpg</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* UPLOAD SECTION */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center">

          <label className="block border-2 border-dashed border-gray-600 p-12 rounded-2xl cursor-pointer hover:border-blue-500 transition">

            <input
              type="file"
              accept=".zip"
              className="hidden"
              onChange={handleFileChange}
              disabled={success}
            />

            <p className="text-gray-400">
              Click to upload dataset ZIP file
            </p>

          </label>

          {fileName && (

            <p className="mt-6 text-green-400 font-medium">
              Selected File: {fileName}
            </p>

          )}

          {/* MESSAGE BOX */}
          {message && (

            <div
              className={`mt-6 p-4 rounded-lg ${
                success
                  ? "bg-green-900/40 text-green-400 border border-green-500/30"
                  : "bg-red-900/40 text-red-400 border border-red-500/30"
              }`}
            >
              {message}
            </div>

          )}

          {/* BUTTON */}
          <button
            onClick={handleUploadDataset}
            disabled={loading || success}
            className={`mt-8 px-8 py-3 rounded-lg transition shadow-lg flex items-center justify-center gap-2 mx-auto
              ${
                success
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >

            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : success ? (
              "Uploaded ✓"
            ) : (
              "Upload Dataset"
            )}

          </button>

        </div>

      </div>

    </div>

  );

}