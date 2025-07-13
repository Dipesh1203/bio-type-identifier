import React, { useState, useRef } from "react";
import { Upload, Image, AlertCircle } from "lucide-react";
import { useFingerprintContext } from "../../context/FingerprintContext";

const FingerprintUploader: React.FC = () => {
  const { uploadImage, isAnalyzing } = useFingerprintContext();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    console.log(" type ", file.type);
    console.log(" type ", file);
    setFileType(file.type);
    // if (file.type === "image/jpeg" || file.type === "image/jpg") {
    //   setError("incorrect image cannot predict blood group result");
    //   return false;
    // }
    // Check file type
    if (!file.type.match("image.*")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return false;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        console.log("before ", fileType);
        uploadImage(event.target.result, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-teal-400 bg-teal-50"
            : "border-slate-300 hover:border-teal-300 bg-slate-50"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isAnalyzing}
        />

        <div className="flex flex-col items-center py-4">
          <div
            className={`mb-4 p-3 rounded-full ${
              dragActive ? "bg-teal-100" : "bg-slate-200"
            }`}
          >
            <Upload
              size={28}
              className={dragActive ? "text-teal-600" : "text-slate-500"}
            />
          </div>
          <p className="text-lg font-medium text-slate-700 mb-2">
            {dragActive
              ? "Drop your fingerprint image here"
              : "Upload Fingerprint Image"}
          </p>
          <p className="text-sm text-slate-500 mb-4">
            JPEG, PNG or GIF (max. 5MB)
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            onClick={handleButtonClick}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Select File"}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
            <AlertCircle size={18} className="mt-0.5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-slate-500">
        <p className="mb-1">
          <strong>Note:</strong> For best results, use a clear fingerprint image
          taken in good lighting.
        </p>
        <div className="flex items-center mt-2">
          <Image size={16} className="mr-2 text-slate-400" />
          <span>
            Recommended: high-contrast images showing clear ridge patterns
          </span>
        </div>
      </div>
    </div>
  );
};

export default FingerprintUploader;
