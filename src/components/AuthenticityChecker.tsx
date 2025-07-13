import React, { useState } from 'react';
import { Scan, Shield, AlertTriangle, CheckCircle, XCircle, Camera, Search } from 'lucide-react';
import { checkMedicineAuthenticity, AuthenticityData } from '../data/mockAuthenticity';

export const AuthenticityChecker: React.FC = () => {
  const [boxId, setBoxId] = useState('');
  const [result, setResult] = useState<AuthenticityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  const handleCheck = async () => {
    if (!boxId.trim()) return;
    
    setIsLoading(true);
    setSearchAttempted(true);
    setResult(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const authenticityResult = checkMedicineAuthenticity(boxId.trim());
    setResult(authenticityResult);
    setIsLoading(false);
  };

  const handleScanSimulation = () => {
    setScanMode(true);
    setIsLoading(true);
    
    // Simulate camera scanning
    setTimeout(() => {
      const sampleIds = ['ASP001234567', 'IBU987654321', 'FAKE123456', 'MET555666777'];
      const randomId = sampleIds[Math.floor(Math.random() * sampleIds.length)];
      setBoxId(randomId);
      setScanMode(false);
      
      const authenticityResult = checkMedicineAuthenticity(randomId);
      setResult(authenticityResult);
      setSearchAttempted(true);
      setIsLoading(false);
    }, 3000);
  };

  const handleTryExample = (exampleId: string) => {
    setBoxId(exampleId);
    setResult(null);
    setSearchAttempted(false);
  };

  const getVerificationIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Medicine Authenticity Checker</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Verify if your medicine is authentic by scanning the box or entering the product ID. 
          Protect yourself from counterfeit medicines.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 border border-gray-700">
        <div className="space-y-6">
          {/* Scan or Enter Options */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleScanSimulation}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-green-500 text-white py-4 px-6 rounded-2xl hover:from-teal-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Camera className="w-6 h-6" />
              {scanMode ? 'Scanning...' : 'Scan Medicine Box'}
            </button>
            
            <div className="flex items-center gap-3 text-gray-500">
              <div className="h-px bg-gray-600 flex-1"></div>
              <span className="text-sm">OR</span>
              <div className="h-px bg-gray-600 flex-1"></div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={boxId}
                  onChange={(e) => setBoxId(e.target.value)}
                  placeholder="Enter medicine box ID (e.g., ASP001234567)"
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-600 bg-gray-700 text-white rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-200 placeholder-gray-400"
                  disabled={isLoading}
                />
                <Scan className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheck}
            disabled={isLoading || !boxId.trim()}
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-4 px-6 rounded-2xl hover:from-teal-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <Search className="w-5 h-5" />
            {isLoading ? 'Verifying...' : 'Check Authenticity'}
          </button>

          {/* Try Examples */}
          {!result && !isLoading && (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Try these sample IDs:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['ASP001234567', 'IBU987654321', 'FAKE123456', 'MET555666777'].map((id) => (
                  <button
                    key={id}
                    onClick={() => handleTryExample(id)}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors text-sm"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 bg-gray-800 rounded-2xl px-8 py-6 shadow-lg border border-gray-700">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <span className="text-lg text-gray-300">
              {scanMode ? 'Scanning medicine box...' : 'Verifying authenticity...'}
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && result && (
        <div className="animate-fade-in">
          <div className={`bg-white rounded-3xl shadow-xl p-8 border-l-8 ${
            result.isAuthentic ? 'bg-gray-800 border-green-500' : 'bg-gray-800 border-red-500'
          }`}>
            {/* Result Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${
                result.isAuthentic ? 'bg-green-900/30' : 'bg-red-900/30'
              }`}>
                {result.isAuthentic ? (
                  <Shield className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                )}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  result.isAuthentic ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.isAuthentic ? 'Authentic Medicine' : 'Counterfeit Detected'}
                </h3>
                <p className="text-gray-400">{result.medicineName}</p>
              </div>
            </div>

            {/* Message */}
            <div className={`p-4 rounded-2xl mb-6 ${
              result.isAuthentic ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
            }`}>
              <p className={`${
                result.isAuthentic ? 'text-green-300' : 'text-red-300'
              }`}>
                {result.message}
              </p>
            </div>

            {/* Medicine Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Product Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Box ID:</span>
                    <span className="font-mono text-gray-300">{result.boxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Manufacturer:</span>
                    <span className="text-gray-300">{result.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Batch Number:</span>
                    <span className="font-mono text-gray-300">{result.batchNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry Date:</span>
                    <span className="text-gray-300">{result.expiryDate}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              {result.verificationDetails && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Security Verification</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Hologram</span>
                      {getVerificationIcon(result.verificationDetails.hologram)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">QR Code</span>
                      {getVerificationIcon(result.verificationDetails.qrCode)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Serial Number</span>
                      {getVerificationIcon(result.verificationDetails.serialNumber)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Packaging</span>
                      {getVerificationIcon(result.verificationDetails.packaging)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setBoxId('');
                  setSearchAttempted(false);
                }}
                className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
              >
                Check Another Medicine
              </button>
              
              {!result.isAuthentic && (
                <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors">
                  Report Counterfeit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && searchAttempted && !result && boxId && (
        <div className="text-center py-12">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md mx-auto border border-gray-700">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Medicine Not Found</h3>
            <p className="text-gray-400 mb-4">
              No record found for ID "{boxId}". This could indicate a counterfeit product.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['ASP001234567', 'IBU987654321', 'FAKE123456'].map((id) => (
                <button
                  key={id}
                  onClick={() => handleTryExample(id)}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors text-sm"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};