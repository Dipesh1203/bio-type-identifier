import React from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint, Database, Brain, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Fingerprint-Based Blood Group and Pattern Analysis
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Advanced biometric analysis powered by deep learning to identify fingerprint patterns
            and predict blood groups with high accuracy.
          </p>
          <Link 
            to="/analysis" 
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors shadow-md group"
          >
            Start Analysis
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Our system uses state-of-the-art convolutional neural networks to analyze fingerprint patterns
            and predict blood groups with remarkable accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
              <Fingerprint size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Fingerprint Analysis</h3>
            <p className="text-slate-600">
              Upload your fingerprint image and our system will classify it into the correct pattern type:
              arch, loop, or whorl with detailed visualization.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Blood Group Prediction</h3>
            <p className="text-slate-600">
              Using advanced pattern recognition, the system predicts your blood group based on
              the unique characteristics in your fingerprint.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1">
            <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Advanced AI Models</h3>
            <p className="text-slate-600">
              Our dual CNN architecture ensures high accuracy in both fingerprint classification
              and blood group prediction with continuous improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Accuracy Section */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Reliable Results</h2>
            <p className="text-slate-600 mb-6">
              Our system has been trained on diverse datasets to ensure high accuracy across
              different demographic groups and image qualities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/3 font-medium text-slate-700">Fingerprint Classification:</div>
                <div className="w-2/3">
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="text-right text-sm text-slate-600 mt-1">92% accuracy</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/3 font-medium text-slate-700">Blood Group Prediction:</div>
                <div className="w-2/3">
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="text-right text-sm text-slate-600 mt-1">87% accuracy</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-600 opacity-10 rounded-full transform -rotate-6"></div>
              <img 
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="AI Fingerprint Analysis" 
                className="rounded-lg shadow-lg relative z-10 max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Try It Out?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Experience the power of our fingerprint analysis system. Simply upload your fingerprint
          image and get instant results.
        </p>
        <Link 
          to="/analysis" 
          className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors shadow-md text-lg"
        >
          Start Your Analysis
          <ArrowRight className="ml-2" />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;