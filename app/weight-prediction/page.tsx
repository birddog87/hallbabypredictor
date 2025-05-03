'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function WeightPrediction() {
  const [pounds, setPounds] = useState('');
  const [ounces, setOunces] = useState('');
  const [predictor, setPredictor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 👇 Notice the type annotation here:
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert to decimal pounds for storage
    const weight = parseFloat(pounds) + parseFloat(ounces) / 16;

    try {
      const response = await fetch('/api/weight-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight, predictor }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600">Your weight prediction for Baby Hall has been recorded.</p>
            </div>

            <div className="flex justify-between gap-4">
              <Link
                href="/"
                className="flex-1 inline-block bg-gray-100 text-gray-800 text-center px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/results"
                className="flex-1 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                See Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="h-16 bg-gradient-to-r from-purple-400 to-purple-600"></div>

          <div className="p-8">
            <Link
              href="/"
              className="text-purple-500 hover:text-purple-700 transition-colors flex items-center mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 Z M12,4.5 C7.85786438,4.5 4.5,7.85786438 4.5,12 C4.5,16.1421356 7.85786438,19.5 12,19.5 C16.1421356,19.5 19.5,16.1421356 19.5,12 C19.5,7.85786438 16.1421356,4.5 12,4.5 Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Weight Prediction</h1>
              <p className="text-gray-600">How much do you think Baby Hall will weigh at birth?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Predicted Birth Weight</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pounds" className="block text-xs text-gray-500 mb-1">
                      Pounds
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="pounds"
                        min="0"
                        max="15"
                        value={pounds}
                        onChange={(e) => setPounds(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="0"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">lbs</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ounces" className="block text-xs text-gray-500 mb-1">
                      Ounces
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="ounces"
                        min="0"
                        max="15"
                        value={ounces}
                        onChange={(e) => setOunces(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="0"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">oz</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 italic">
                  Most babies weigh between 5 lbs 8 oz and 8 lbs 13 oz.
                </p>
              </div>

              <div>
                <label htmlFor="predictor" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="predictor"
                  value={predictor}
                  onChange={(e) => setPredictor(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Weight Prediction'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
