import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface PatternMatch {
  arch: number;
  loop: number;
  whorl: number;
}

interface AnalysisResults {
  fingerprintType: string;
  typeConfidence: number;
  bloodGroup: string;
  bloodConfidence: number;
  patternMatch: PatternMatch;
}

interface HistoryItem extends AnalysisResults {
  imageUrl: string;
  timestamp: number;
}

interface FingerprintContextType {
  uploadedImage: string | null;
  isAnalyzing: boolean;
  analysisResults: AnalysisResults | null;
  analysisHistory: HistoryItem[];
  uploadImage: (imageData: string) => void;
  clearHistory: () => void;
  removeHistoryItem: (index: number) => void;
}

// Create Context
const FingerprintContext = createContext<FingerprintContextType | undefined>(undefined);

// Provider Component
export const FingerprintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  
  // Load history from localStorage
  const [analysisHistory, setAnalysisHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('fingerprintHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Mock analysis function (simulates API call to ML backend)
  const analyzeFingerprint = (imageData: string) => {
    return new Promise<AnalysisResults>((resolve) => {
      // Simulating API call delay
      setTimeout(() => {
        // Generate random results for demonstration
        const fingerprintTypes = ['Arch', 'Loop', 'Whorl'];
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        
        const randomType = fingerprintTypes[Math.floor(Math.random() * fingerprintTypes.length)];
        const randomBlood = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
        
        // Generate random confidence scores
        const typeConfidence = Math.floor(Math.random() * 25) + 75; // 75-99%
        const bloodConfidence = Math.floor(Math.random() * 35) + 65; // 65-99%
        
        // Generate random pattern match percentages that add up to 100
        let arch = Math.floor(Math.random() * 100);
        let loop = Math.floor(Math.random() * (100 - arch));
        let whorl = 100 - arch - loop;
        
        // Ensure the dominant pattern matches the result
        if (randomType === 'Arch') {
          // Swap values to make arch the highest
          if (arch < loop || arch < whorl) {
            const temp = arch;
            arch = Math.max(loop, whorl);
            if (loop > whorl) {
              loop = temp;
            } else {
              whorl = temp;
            }
          }
        } else if (randomType === 'Loop') {
          // Swap values to make loop the highest
          if (loop < arch || loop < whorl) {
            const temp = loop;
            loop = Math.max(arch, whorl);
            if (arch > whorl) {
              arch = temp;
            } else {
              whorl = temp;
            }
          }
        } else { // Whorl
          // Swap values to make whorl the highest
          if (whorl < arch || whorl < loop) {
            const temp = whorl;
            whorl = Math.max(arch, loop);
            if (arch > loop) {
              arch = temp;
            } else {
              loop = temp;
            }
          }
        }
        
        resolve({
          fingerprintType: randomType,
          typeConfidence,
          bloodGroup: randomBlood,
          bloodConfidence,
          patternMatch: {
            arch,
            loop,
            whorl
          }
        });
      }, 2000); // 2 second delay for realism
    });
  };

  const uploadImage = async (imageData: string) => {
    setUploadedImage(imageData);
    setIsAnalyzing(true);
    setAnalysisResults(null);
    
    try {
      // Call the mock analysis function
      const results = await analyzeFingerprint(imageData);
      setAnalysisResults(results);
      
      // Add to history
      const historyItem: HistoryItem = {
        ...results,
        imageUrl: imageData,
        timestamp: Date.now()
      };
      
      const updatedHistory = [historyItem, ...analysisHistory];
      setAnalysisHistory(updatedHistory);
      localStorage.setItem('fingerprintHistory', JSON.stringify(updatedHistory));
      
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error state here
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem('fingerprintHistory');
  };

  const removeHistoryItem = (index: number) => {
    const updatedHistory = [...analysisHistory];
    updatedHistory.splice(index, 1);
    setAnalysisHistory(updatedHistory);
    localStorage.setItem('fingerprintHistory', JSON.stringify(updatedHistory));
  };

  const value = {
    uploadedImage,
    isAnalyzing,
    analysisResults,
    analysisHistory,
    uploadImage,
    clearHistory,
    removeHistoryItem
  };

  return (
    <FingerprintContext.Provider value={value}>
      {children}
    </FingerprintContext.Provider>
  );
};

// Custom Hook for using the context
export const useFingerprintContext = () => {
  const context = useContext(FingerprintContext);
  if (context === undefined) {
    throw new Error('useFingerprintContext must be used within a FingerprintProvider');
  }
  return context;
};