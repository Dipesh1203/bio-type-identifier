import React from "react";
import { Fingerprint, Droplets, AlertCircle, Loader2 } from "lucide-react";
import { useFingerprintContext } from "../../context/FingerprintContext";

const ResultsDisplay: React.FC = () => {
  const { isAnalyzing, analysisResults, uploadedImage, bloodGroupError } =
    useFingerprintContext();

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 bg-slate-50 rounded-lg border border-slate-200">
        <Loader2 className="h-10 w-10 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Analyzing fingerprint...</p>
        <div className="mt-4 w-full max-w-xs bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 rounded-full transition-all duration-1000"
            style={{ width: "70%" }}
          ></div>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Please wait while our neural networks process your image
        </p>
      </div>
    );
  }

  if (!uploadedImage) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 bg-slate-50 rounded-lg border border-slate-200">
        <Fingerprint className="h-12 w-12 text-slate-300 mb-4" />
        <p className="text-slate-500 text-center">
          Upload a fingerprint image to see analysis results
        </p>
      </div>
    );
  }

  if (!analysisResults) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 bg-slate-50 rounded-lg border border-slate-200">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-red-600 text-center font-medium">Analysis failed</p>
        <p className="text-slate-500 text-center mt-2 text-sm">
          Prediction confidence is too low. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-1/3 bg-slate-100 p-3 rounded-lg flex items-center justify-center">
          <img
            src={uploadedImage}
            alt="Uploaded fingerprint"
            className="max-h-32 max-w-full object-contain"
          />
        </div>
        <div className="sm:w-2/3 space-y-4">
          {/* Fingerprint Type Result */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center mb-2">
              <Fingerprint className="text-teal-600 mr-2" size={18} />
              <h3 className="text-sm font-medium text-slate-700">
                Fingerprint Type
              </h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-slate-800">
                {analysisResults.fingerprintType}
              </p>
              {/* <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                {analysisResults.typeConfidence}% confidence
              </div> */}
            </div>
          </div>

          {/* Blood Group Result */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center mb-2">
              <Droplets className="text-red-600 mr-2" size={18} />
              <h3 className="text-sm font-medium text-slate-700">
                Blood Group
              </h3>
            </div>
            <div className="flex justify-between items-center">
              {analysisResults.bloodGroup && (
                <p className="text-xl font-semibold text-slate-800">
                  {analysisResults.bloodGroup}
                </p>
              )}
              {bloodGroupError && (
                <p className="text-sm font-bold text-red-500">
                  {bloodGroupError}
                </p>
              )}

              {/* <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {analysisResults.bloodConfidence}% confidence
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Match Visualization */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h3 className="text-sm font-medium text-slate-700 mb-3">
          Pattern Matching
        </h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-slate-600">Arch</span>
              <span className="text-xs text-slate-600">
                {analysisResults.patternMatch.arch}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: `${analysisResults.patternMatch.arch}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-slate-600">Loop</span>
              <span className="text-xs text-slate-600">
                {analysisResults.patternMatch.loop}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: `${analysisResults.patternMatch.loop}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-slate-600">Whorl</span>
              <span className="text-xs text-slate-600">
                {analysisResults.patternMatch.whorl}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: `${analysisResults.patternMatch.whorl}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm text-yellow-800">
        <p>
          <strong>Disclaimer:</strong> This analysis is for educational purposes
          only. Blood group prediction should be confirmed through medical
          testing.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
