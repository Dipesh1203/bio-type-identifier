import React from 'react';
import { Brain, Fingerprint, Database, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">About BioIDScan</h1>
      
      {/* Introduction */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <p className="text-slate-600 mb-4">
          BioIDScan is an innovative biometric analysis system that utilizes deep learning to analyze
          fingerprint patterns and predict blood groups. Our technology is built on two carefully
          trained convolutional neural networks, designed to provide accurate, fast, and reliable results.
        </p>
        <p className="text-slate-600">
          Whether you're a researcher, healthcare professional, or simply curious about biometric
          technology, our system offers valuable insights into the correlation between fingerprint
          patterns and blood groups.
        </p>
      </div>
      
      {/* Technology */}
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Technology</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Brain className="text-teal-600 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-slate-800">Dual CNN Architecture</h3>
          </div>
          <p className="text-slate-600">
            Our system employs two separate convolutional neural networks:
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>Fingerprint Pattern Classification Model</li>
            <li>Blood Group Prediction Model</li>
          </ul>
          <p className="text-slate-600 mt-3">
            This dual-model approach allows for specialized processing of each prediction task,
            resulting in higher accuracy and more reliable results.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Database className="text-teal-600 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-slate-800">Training Data</h3>
          </div>
          <p className="text-slate-600">
            Our models have been trained on diverse datasets comprising:
          </p>
          <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
            <li>Over 10,000 labeled fingerprint images</li>
            <li>Fingerprints from diverse demographic groups</li>
            <li>Various image quality levels to ensure robustness</li>
            <li>Validated blood group correlations</li>
          </ul>
        </div>
      </div>
      
      {/* How It Works */}
      <h2 className="text-2xl font-bold text-slate-800 mb-4">How It Works</h2>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200"></div>
          
          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">1</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Image Upload & Preprocessing</h3>
            <p className="text-slate-600">
              You upload a fingerprint image which is then preprocessed through several stages:
              resizing to 128×128 pixels, conversion to grayscale, and normalization of pixel values.
            </p>
          </div>
          
          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">2</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Fingerprint Classification</h3>
            <p className="text-slate-600">
              The first CNN analyzes the fingerprint pattern and classifies it as one of the three
              main types: arch, loop, or whorl. The model identifies distinctive ridge patterns
              and characteristics.
            </p>
          </div>
          
          <div className="relative pl-12 pb-8">
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">3</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Blood Group Prediction</h3>
            <p className="text-slate-600">
              The second CNN analyzes the same image to predict the associated blood group. This model
              has been trained to identify subtle correlations between fingerprint features and
              blood group markers.
            </p>
          </div>
          
          <div className="relative pl-12">
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">4</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Results Display</h3>
            <p className="text-slate-600">
              The system presents the analysis results, showing both the fingerprint pattern type and
              the predicted blood group, along with confidence scores for each prediction.
            </p>
          </div>
        </div>
      </div>
      
      {/* Privacy & Security */}
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Privacy & Security</h2>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-start mb-4">
          <Shield className="text-teal-600 mr-3 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Your Data is Protected</h3>
            <p className="text-slate-600">
              We take your privacy seriously. All fingerprint images and analysis results are:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Processed locally in your browser</li>
              <li>Never stored on external servers</li>
              <li>Automatically deleted after your session ends</li>
              <li>Protected with encryption during analysis</li>
            </ul>
            <p className="text-slate-600 mt-3">
              Your analysis history is stored only in your local browser storage and can be cleared at any time.
            </p>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Important Disclaimer</h3>
        <p className="text-red-700">
          BioIDScan is designed for educational and research purposes only. The blood group predictions
          should not be used for medical decisions or replace proper medical testing. Always consult
          healthcare professionals for medical advice and proper blood type testing.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;