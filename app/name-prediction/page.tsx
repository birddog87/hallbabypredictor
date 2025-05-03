'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function NamePrediction() {
  const [name, setName] = useState('');
  const [predictor, setPredictor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/name-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender: 'Girl', // We now know it's a girl
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
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-200 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600">Your name prediction for Baby Hall has been recorded.</p>
            </div>
            
            <div className="flex justify-between gap-4">
              <Link href="/" 
                    className="flex-1 inline-block bg-gray-100 text-gray-800 text-center px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Back to Home
              </Link>
              <Link href="/results" 
                    className="flex-1 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center px-4 py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors">
                See Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-200 py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="h-16 bg-gradient-to-r from-pink-400 to-pink-600"></div>
          
          <div className="p-8">
            <Link href="/" className="text-pink-500 hover:text-pink-700 transition-colors flex items-center mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1 C14.4752834,1 16.7451133,1.85985383 18.5530795,3.32511273 C18.770524,3.50463339 18.8031564,3.82044422 18.6243584,4.03705219 C18.4452844,4.25388783 18.1280202,4.28745242 17.9101986,4.10782961 C16.2732557,2.78344751 14.2182969,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,10.1354115 21.4773984,8.39059586 20.5464442,6.88905029 C20.4030521,6.64709812 20.4739022,6.33877672 20.7159207,6.19537656 C20.9584607,6.05185857 21.266609,6.12297893 21.4099115,6.36510163 C22.4379276,8.0321999 23,9.95404416 23,12 C23,18.0751322 18.0751322,23 12,23 C5.9248678,23 1,18.0751322 1,12 C1,5.9248678 5.9248678,1 12,1 Z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Name Prediction</h1>
              <p className="text-gray-600">What do you think Kelley and Jade will name their baby girl?</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Baby Girl&apos;s Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your name prediction"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-colors disabled:opacity-70 flex items-center justify-center"
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
                  'Submit Name Prediction'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}