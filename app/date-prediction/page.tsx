'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DatePrediction() {
  const [date, setDate] = useState('');
  const [predictor, setPredictor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/date-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          predictor,
        }),
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600">Your birth date prediction for Baby Hall has been recorded.</p>
            </div>
            
            <div className="flex justify-between gap-4">
              <Link href="/" 
                    className="flex-1 inline-block bg-gray-100 text-gray-800 text-center px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Back to Home
              </Link>
              <Link href="/results" 
                    className="flex-1 inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center px-4 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors">
                See Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const minDate = '2025-07-01';
  const maxDate = '2025-09-15';
  const dueDate = '2025-08-10';

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="h-16 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
          
          <div className="p-8">
            <Link href="/" className="text-indigo-500 hover:text-indigo-700 transition-colors flex items-center mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L16.7071068,9.70710678 L12,14.4142136 L8.29289322,10.7071068 L9.70710678,9.29289322 L12,11.5857864 L15.2928932,8.29289322 Z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Birth Date Prediction</h1>
              <p className="text-gray-600">When do you think Baby Hall will arrive?</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Predicted Birth Date
                </label>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                  <div className="flex items-center text-indigo-500 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="font-medium">Due Date Information</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Kelley and Jade&apos;s baby girl is due on <span className="font-semibold">{new Date(dueDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 italic">
                    Most babies arrive within 2 weeks before or after their due date.
                  </p>
                </div>
                
                <input
                  type="date"
                  id="date"
                  min={minDate}
                  max={maxDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Date Prediction'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}