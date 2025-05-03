'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NamePredictionItem {
  id: string | number;
  name: string;
  predictor: string;
  createdAt: string | Date;
}

interface WeightPredictionItem {
  id: string | number;
  weight: number; // Assuming weight is a number
  predictor: string;
  createdAt: string | Date;
}

interface DatePredictionItem {
  id: string | number;
  date: string | Date; // Assuming date is string or Date
  predictor: string;
  createdAt: string | Date;
}

export default function Results() {
  const [nameData, setNameData] = useState<NamePredictionItem[]>([]);
  const [weightData, setWeightData] = useState<WeightPredictionItem[]>([]);
  const [dateData, setDateData] = useState<DatePredictionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all prediction data
        const [nameRes, weightRes, dateRes] = await Promise.all([
          fetch('/api/name-prediction'),
          fetch('/api/weight-prediction'),
          fetch('/api/date-prediction')
        ]);

        if (nameRes.ok && weightRes.ok && dateRes.ok) {
          const [names, weights, dates] = await Promise.all([
            nameRes.json(),
            weightRes.json(),
            dateRes.json()
          ]);

          setNameData(names);
          setWeightData(weights);
          setDateData(dates);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds for live updates
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to format weight from decimal to pounds/ounces
  const formatWeight = (weight: number) => {
    const pounds = Math.floor(weight);
    const ounces = Math.round((weight - pounds) * 16);
    return `${pounds} lb ${ounces} oz`;
  };

  // Function to calculate popular predictions
  const getMostPopularName = () => {
    if (nameData.length === 0) return 'No predictions yet';
    
    const nameCounts: Record<string, number> = {};
    nameData.forEach((item: NamePredictionItem) => {
      const name = item.name.trim().toLowerCase();
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });
    
    let mostPopularName = '';
    let highestCount = 0;
    
    for (const name in nameCounts) {
      if (nameCounts[name] > highestCount) {
        highestCount = nameCounts[name];
        mostPopularName = name;
      }
    }
    
    // Capitalize the first letter
    return mostPopularName.charAt(0).toUpperCase() + mostPopularName.slice(1);
  };
  
  const getAverageWeight = () => {
    if (weightData.length === 0) return 'No predictions yet';
    
    const totalWeight = weightData.reduce((sum: number, item: WeightPredictionItem) => sum + Number(item.weight || 0), 0);
    const avgWeight = totalWeight / weightData.length;
    
    return formatWeight(avgWeight);
  };
  
  const getMostPredictedDate = () => {
    if (dateData.length === 0) return 'No predictions yet';
    
    const dateCounts: Record<string, number> = {};
    dateData.forEach((item: DatePredictionItem) => {
      if (item.date) {
          try {
              const dateStr = new Date(item.date).toISOString().split('T')[0];
              dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
          } catch (e) {
              console.error("Error processing date:", item.date, e);
          }
      }
    });
    
    let mostPredictedDate = '';
    let highestCount = 0;
    
    for (const date in dateCounts) {
      if (dateCounts[date] > highestCount) {
        highestCount = dateCounts[date];
        mostPredictedDate = date;
      }
    }
    
    return new Date(mostPredictedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderNamePredictions = () => {
    if (nameData.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 italic">No name predictions yet. Be the first!</p>
          <Link href="/name-prediction" className="mt-4 inline-block text-pink-500 hover:text-pink-700">
            Make a name prediction
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-pink-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Predicted By</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Date Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {nameData.map((item: NamePredictionItem) => (
                <tr key={item.id} className="hover:bg-pink-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.predictor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderWeightPredictions = () => {
    if (weightData.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 italic">No weight predictions yet. Be the first!</p>
          <Link href="/weight-prediction" className="mt-4 inline-block text-purple-500 hover:text-purple-700">
            Make a weight prediction
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-purple-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Predicted By</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Date Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {weightData.map((item: WeightPredictionItem) => (
                <tr key={item.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{formatWeight(Number(item.weight))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.predictor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDatePredictions = () => {
    if (dateData.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 italic">No date predictions yet. Be the first!</p>
          <Link href="/date-prediction" className="mt-4 inline-block text-indigo-500 hover:text-indigo-700">
            Make a date prediction
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-indigo-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Predicted Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Predicted By</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Date Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dateData.map((item: DatePredictionItem) => (
                <tr key={item.id} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.predictor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50">
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container mx-auto flex justify-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Baby Hall <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Predictions</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
          
          <div className="ml-auto text-right">
            <div className="text-gray-500 text-sm">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating predictions...
                </span>
              ) : (
                <span>
                  Live updating every 30 seconds
                  <span className="inline-block ml-2 w-2 h-2 rounded-full bg-green-500"></span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-pink-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Most Popular Name</h3>
            <p className="text-2xl font-bold text-gray-800">{getMostPopularName()}</p>
            <p className="mt-1 text-sm text-gray-600">{nameData.length} name predictions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Average Weight Prediction</h3>
            <p className="text-2xl font-bold text-gray-800">{getAverageWeight()}</p>
            <p className="mt-1 text-sm text-gray-600">{weightData.length} weight predictions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Most Predicted Date</h3>
            <p className="text-2xl font-bold text-gray-800">{getMostPredictedDate()}</p>
            <p className="mt-1 text-sm text-gray-600">{dateData.length} date predictions</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'all'
                ? 'text-pink-600 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Predictions
          </button>
          <button
            onClick={() => setActiveTab('names')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'names'
                ? 'text-pink-600 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Names
          </button>
          <button
            onClick={() => setActiveTab('weights')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'weights'
                ? 'text-pink-600 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Weights
          </button>
          <button
            onClick={() => setActiveTab('dates')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'dates'
                ? 'text-pink-600 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dates
          </button>
        </div>

        {/* Prediction Tables */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="space-y-10">
            {(activeTab === 'all' || activeTab === 'names') && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Name Predictions</h2>
                {renderNamePredictions()}
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'weights') && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Weight Predictions</h2>
                {renderWeightPredictions()}
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'dates') && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Birth Date Predictions</h2>
                {renderDatePredictions()}
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Made with ❤️ for Kelley and Jade Hall</p>
          <p className="text-sm text-gray-500 mt-2">Celebrating the upcoming arrival of their baby girl</p>
        </div>
      </footer>
    </div>
  );
}