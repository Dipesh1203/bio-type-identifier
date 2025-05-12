import React from "react";
import FingerprintUploader from "../components/analysis/FingerprintUploader";
import ResultsDisplay from "../components/analysis/ResultsDisplay";
import { useFingerprintContext } from "../context/FingerprintContext";

const AnalysisPage: React.FC = () => {
  const { isAnalyzing } = useFingerprintContext();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Fingerprint Analysis
        </h1>
        <p className="text-slate-600">
          Upload a fingerprint image to analyze its pattern and predict the
          associated blood group
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            Upload Fingerprint
          </h2>
          <FingerprintUploader />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Analysis Results
          </h2>
          <ResultsDisplay />
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          About Fingerprint Types
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Arch Pattern</h3>
            <img
              src="https://media.sciencephoto.com/c0/33/44/40/c0334440-800px-wm.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="Arch fingerprint pattern"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <p className="text-sm text-slate-600">
              Ridges enter from one side, rise in the center forming an arc, and
              exit from the opposite side.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Loop Pattern</h3>
            <img
              src="https://media.sciencephoto.com/image/c0334371/225?auto=compress&cs=tinysrgb&w=600"
              alt="Loop fingerprint pattern"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <p className="text-sm text-slate-600">
              Ridges enter from one side, form a curve, and exit from the same
              side they entered.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="font-medium text-slate-800 mb-2">Whorl Pattern</h3>
            <img
              src="https://www.forensicsciencesimplified.org/prints/img/Whorl.png?auto=compress&cs=tinysrgb&w=600"
              alt="Whorl fingerprint pattern"
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <p className="text-sm text-slate-600">
              Ridges form circular or spiral patterns around a central point.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
