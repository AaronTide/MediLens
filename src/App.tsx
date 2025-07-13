import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { MedicineCard } from './components/MedicineCard';
import { AuthenticityChecker } from './components/AuthenticityChecker';
import { getMedicineInfo } from './services/openai';
import { MedicineData } from './data/mockMedicines';
import { 
  Pill, 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  LayoutGrid, 
  FileEdit, 
  Type,
  Stethoscope,
  Activity,
  Users,
  Award,
  CheckCircle,
  Search,
  Scan
} from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setSearchAttempted(true);
    setError(null);
    setSelectedMedicine(null);
    
    try {
      const medicine = await getMedicineInfo(searchQuery.trim());
      setSelectedMedicine(medicine);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch medicine information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryExample = (medicineName: string) => {
    setSearchQuery(medicineName);
    setSelectedMedicine(null);
    setSearchAttempted(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-2xl">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MediLens</h1>
                <p className="text-teal-400 text-sm">Your Medicine Information Hub</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#search" className="text-gray-300 hover:text-teal-400 transition-colors">Search</a>
              <a href="#authenticity" className="text-gray-300 hover:text-teal-400 transition-colors">Verify</a>
              <a href="#about" className="text-gray-300 hover:text-teal-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-teal-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Hero Content */}
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                We take care of
                <span className="block bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                  Your Health
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Get comprehensive medicine information, verify authenticity, and make informed healthcare decisions with our advanced AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-2xl hover:from-teal-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Search className="w-6 h-6" />
                  Search Medicine
                </button>
                <button 
                  onClick={() => document.getElementById('authenticity')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-700 text-white px-8 py-4 rounded-2xl hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold border border-gray-600 hover:border-teal-500"
                >
                  <Scan className="w-6 h-6" />
                  Verify Authenticity
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Comprehensive Info</h3>
                <p className="text-gray-400 text-sm">Detailed medicine information including treatments, side effects, and safety warnings</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Authenticity Check</h3>
                <p className="text-gray-400 text-sm">Verify medicine authenticity to protect against counterfeit products</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Safety Warnings</h3>
                <p className="text-gray-400 text-sm">Clear safety information for specific health conditions and patient groups</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Multi-Language</h3>
                <p className="text-gray-400 text-sm">Translation support and audio playback for accessibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-800 py-16 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform provides reliable medicine information to help you make informed healthcare decisions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-4xl font-bold text-teal-400 mb-2">10K+</div>
              <div className="text-white font-semibold mb-1">Medicines Verified</div>
              <div className="text-gray-400 text-sm">Comprehensive database coverage</div>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-white font-semibold mb-1">Accuracy Rate</div>
              <div className="text-gray-400 text-sm">Reliable information you can trust</div>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-4xl font-bold text-teal-400 mb-2">24/7</div>
              <div className="text-white font-semibold mb-1">Available</div>
              <div className="text-gray-400 text-sm">Access information anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Section */}
        <section id="search" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Search Medicine Information</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enter any medicine name to get comprehensive information about treatments, side effects, and safety warnings
            </p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          
          {/* Try Examples */}
          {!selectedMedicine && !isLoading && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Try searching for these medicines:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Aspirin', 'Ibuprofen', 'Metformin', 'Lisinopril', 'Atorvastatin'].map((medicine) => (
                  <button
                    key={medicine}
                    onClick={() => handleTryExample(medicine)}
                    className="px-4 py-2 bg-gray-800 text-teal-400 rounded-full hover:bg-gray-700 transition-colors border border-gray-700 hover:border-teal-500"
                  >
                    {medicine}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 bg-gray-800 rounded-2xl px-8 py-6 shadow-lg border border-gray-700">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <span className="text-lg text-gray-300">Analyzing medicine information...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-12">
            <div className="bg-red-900/50 border border-red-700 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && selectedMedicine && (
          <div className="animate-fade-in">
            <MedicineCard medicine={selectedMedicine} />
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchAttempted && !selectedMedicine && searchQuery && (
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md mx-auto border border-gray-700">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Medicine Not Found</h3>
              <p className="text-gray-400 mb-4">
                Sorry, we couldn't find information for "{searchQuery}". Please check the spelling or try a different medicine name.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Aspirin', 'Ibuprofen', 'Metformin'].map((medicine) => (
                  <button
                    key={medicine}
                    onClick={() => handleTryExample(medicine)}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors text-sm"
                  >
                    {medicine}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Authenticity Checker Section */}
        <section id="authenticity" className="mt-20 border-t border-gray-700 pt-16">
          <AuthenticityChecker />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-2xl">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">MediLens</h3>
                  <p className="text-teal-400">Your Medicine Information Hub</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering patients and healthcare professionals with comprehensive medicine information and authenticity verification to ensure safe healthcare decisions.
              </p>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded"></div>
                </div>
                <div className="text-gray-400 text-sm">
                  <p>Scan QR Code</p>
                  <p>for mobile app</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">CONTACT US</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span>info@medilens.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Globe className="w-5 h-5 text-teal-400" />
                  <span>www.medilens.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span>123 Health Street, Medical City, MC 12345</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">QUICK LINKS</h4>
              <div className="space-y-2">
                <a href="#search" className="block text-gray-400 hover:text-teal-400 transition-colors">Medicine Search</a>
                <a href="#authenticity" className="block text-gray-400 hover:text-teal-400 transition-colors">Authenticity Check</a>
                <a href="#about" className="block text-gray-400 hover:text-teal-400 transition-colors">About Us</a>
                <a href="#privacy" className="block text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a>
                <a href="#terms" className="block text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">COMPREHENSIVE</div>
                  <div className="text-gray-400 text-sm">Complete medicine database</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">VERIFIED</div>
                  <div className="text-gray-400 text-sm">Authenticated information</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">TRUSTED</div>
                  <div className="text-gray-400 text-sm">By healthcare professionals</div>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
              <p>© 2025 MediLens. All rights reserved. This is a demo application for educational purposes.</p>
              <p className="mt-1">Always consult healthcare professionals for medical advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;