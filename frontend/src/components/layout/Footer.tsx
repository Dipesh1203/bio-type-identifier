import React from 'react';
import { Fingerprint, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Fingerprint className="h-6 w-6 text-teal-400" />
              <span className="font-bold text-lg">BioIDScan</span>
            </div>
            <p className="text-slate-300 text-sm">
              Advanced fingerprint analysis for pattern and blood group prediction
              using state-of-the-art deep learning models.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="/" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="/analysis" className="hover:text-teal-400 transition-colors">Analysis</a></li>
              <li><a href="/history" className="hover:text-teal-400 transition-colors">History</a></li>
              <li><a href="/about" className="hover:text-teal-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <p className="text-slate-300 mb-3 text-sm">
              Have questions or suggestions? Get in touch with our team.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} BioIDScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;