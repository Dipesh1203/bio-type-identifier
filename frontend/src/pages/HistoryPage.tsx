import React from 'react';
import { useFingerprintContext } from '../context/FingerprintContext';
import { Trash2, Calendar, Droplets, Fingerprint as FingerprintIcon } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { analysisHistory, clearHistory, removeHistoryItem } = useFingerprintContext();

  if (analysisHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <FingerprintIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">No Analysis History</h1>
          <p className="text-slate-600 mb-6">
            You haven't performed any fingerprint analyses yet. 
            Go to the Analysis page to analyze a fingerprint.
          </p>
          <a 
            href="/analysis" 
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
          >
            Start Analysis
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Analysis History</h1>
        <button 
          onClick={clearHistory}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
        >
          <Trash2 size={16} className="mr-2" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {analysisHistory.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/4 p-4 flex justify-center items-center bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={`Fingerprint analysis ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              
              {/* Content */}
              <div className="md:w-3/4 p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar size={16} className="text-slate-500" />
                      <span className="text-sm text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center mb-1">
                          <FingerprintIcon size={16} className="text-teal-600 mr-2" />
                          <span className="text-sm font-medium text-slate-700">Fingerprint Type</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-800">{item.fingerprintType}</p>
                        <p className="text-xs text-slate-500">Confidence: {item.typeConfidence}%</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <Droplets size={16} className="text-red-600 mr-2" />
                          <span className="text-sm font-medium text-slate-700">Blood Group</span>
                        </div>
                        <p className="text-lg font-semibold text-slate-800">{item.bloodGroup}</p>
                        <p className="text-xs text-slate-500">Confidence: {item.bloodConfidence}%</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeHistoryItem(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;