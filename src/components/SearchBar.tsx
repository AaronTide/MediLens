import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter medicine name (e.g., Aspirin, Lisinopril, Amoxicillin)"
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-600 bg-gray-800 text-white rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-200 shadow-sm placeholder-gray-400"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onSearch();
            }
          }}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 w-6 h-6" />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-xl hover:from-teal-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};