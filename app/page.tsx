import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-200">
      <header className="py-6 px-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-pink-600 text-center">
            Baby Hall <span className="text-pink-400">Predictions</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-16">
          <div className="relative h-40 bg-gradient-to-r from-pink-300 to-pink-500">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-lg">
              <div className="rounded-full bg-pink-100 p-2">
                <svg className="w-24 h-24 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5,8.5 C9.5,6.84315 10.8431,5.5 12.5,5.5 C14.1569,5.5 15.5,6.84315 15.5,8.5 C15.5,10.1569 14.1569,11.5 12.5,11.5 C10.8431,11.5 9.5,10.1569 9.5,8.5 Z M6.5,19 L17.5,19 C17.5,14.8579 15.1421,13 12.5,13 C9.85786,13 6.5,14.8579 6.5,19 Z M3.5,8 C3.5,6.61929 4.61929,5.5 6,5.5 C7.38071,5.5 8.5,6.61929 8.5,8 C8.5,9.38071 7.38071,10.5 6,10.5 C4.61929,10.5 3.5,9.38071 3.5,8 Z M5,19 L4.5,19 C4.5,16.4101 5.21812,14.5 6.5,13.4143 C5.73563,13.1087 4.8968,13 4,13 C2.61286,13 1,13.6687 1,15.5 L1,17.5 C1,18.3284 1.67157,19 2.5,19 L5,19 Z M18.5,8 C18.5,6.61929 19.6193,5.5 21,5.5 C22.3807,5.5 23.5,6.61929 23.5,8 C23.5,9.38071 22.3807,10.5 21,10.5 C19.6193,10.5 18.5,9.38071 18.5,8 Z M17.5,19 L20,19 C20.8284,19 21.5,18.3284 21.5,17.5 L21.5,15.5 C21.5,13.6687 19.8871,13 18.5,13 C17.6032,13 16.7644,13.1087 16,13.4143 C17.2819,14.5 18,16.4101 18,19 L17.5,19 Z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-10 px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Kelley & Jade Hall</h2>
            <p className="text-xl text-pink-500 font-medium mb-6">Are expecting a baby girl!</p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="font-medium">Due Date: August 16th, 2025</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-medium">Countdown: 99 days</span>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join in the excitement by predicting the baby girl&apos;s name, birth date, and weight! 
              Your predictions will be displayed in real-time.
            </p>
          </div>
        </div>
        
        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/name-prediction" 
                className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 bg-gradient-to-r from-pink-400 to-pink-600"></div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center -mt-14 mb-4 mx-auto border-4 border-white shadow-md">
                  <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1 C14.4752834,1 16.7451133,1.85985383 18.5530795,3.32511273 C18.770524,3.50463339 18.8031564,3.82044422 18.6243584,4.03705219 C18.4452844,4.25388783 18.1280202,4.28745242 17.9101986,4.10782961 C16.2732557,2.78344751 14.2182969,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,10.1354115 21.4773984,8.39059586 20.5464442,6.88905029 C20.4030521,6.64709812 20.4739022,6.33877672 20.7159207,6.19537656 C20.9584607,6.05185857 21.266609,6.12297893 21.4099115,6.36510163 C22.4379276,8.0321999 23,9.95404416 23,12 C23,18.0751322 18.0751322,23 12,23 C5.9248678,23 1,18.0751322 1,12 C1,5.9248678 5.9248678,1 12,1 Z M8.5492954,8 L8.5492954,10.042132 C7.85417425,10.2839586 7.35,10.9156088 7.35,11.65 C7.35,12.5784271 8.1,13.35 9,13.35 L15,13.35 C15.9,13.35 16.65,12.5784271 16.65,11.65 C16.65,10.9156088 16.1458257,10.2839586 15.4507046,10.042132 L15.4507046,8 C15.4507046,5.790861 13.6598436,4 11.4507046,4 C9.2415656,4 7.45,5.790861 7.45,8 L7.45,8.80044923 C7.45,8.91137878 7.51612224,9.01460609 7.62226447,9.06920765 C7.72852938,9.12369849 7.85556465,9.11838248 7.95665335,9.0552165 C9.98601481,7.62809179 12.3902486,7.80487293 14.2213609,9.56874645 C14.3324545,9.67442509 14.5036436,9.67940575 14.6204175,9.58053803 C14.7371914,9.48156704 14.7617501,9.31068885 14.6790672,9.18490611 C13.0761737,6.79464555 10.0980445,6.25259556 8.01700475,7.79578639 L8.01700475,7.79578639 L8.5492954,8 Z M14.4507046,8 L14.4507046,9.56571558 C16.3618822,10.0273759 17.2932927,12.1018993 16.1957262,13.7858233 C16.0932883,13.9462845 16.0380247,14.129373 16.0380247,14.3177778 L16.0380247,15.55 C16.0380247,16.3509668 15.3889915,17 14.5880247,17 L14.3755097,17 C14.2699097,17.5826298 13.7604617,18 13.1497222,18 L9.7255502,18 C9.11480965,18 8.60536268,17.5826298 8.49975161,17 L8.28723664,17 C7.48630083,17 6.83726859,16.3509668 6.83726859,15.55 L6.83726859,14.3177778 C6.83726859,14.129373 6.78200493,13.9462845 6.67966808,13.7858233 C5.75547852,12.3582044 6.27109685,10.4555866 7.70879423,9.53146483 C7.72577312,9.52000745 7.74252832,9.50830591 7.75905984,9.49636023 L7.75905984,9.49636023 L8.55,8 C8.55,6.34314575 9.79414575,5 11.45,5 C13.1065126,5 14.4507046,6.34418834 14.4507046,8 Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Name Prediction</h3>
                <p className="text-center text-gray-600">What will Baby Hall&apos;s name be?</p>
                <div className="mt-6 text-center">
                  <span className="inline-block bg-pink-100 text-pink-800 text-sm font-medium px-4 py-1.5 rounded-full">
                    Make Prediction
                  </span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/weight-prediction"
                className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center -mt-14 mb-4 mx-auto border-4 border-white shadow-md">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 Z M12,4.5 C7.85786438,4.5 4.5,7.85786438 4.5,12 C4.5,16.1421356 7.85786438,19.5 12,19.5 C16.1421356,19.5 19.5,16.1421356 19.5,12 C19.5,7.85786438 16.1421356,4.5 12,4.5 Z M12,7 C12.4142136,7 12.75,7.33578644 12.75,7.75 L12.75,11.25 L16.25,11.25 C16.6642136,11.25 17,11.5857864 17,12 C17,12.4142136 16.6642136,12.75 16.25,12.75 L12,12.75 C11.5857864,12.75 11.25,12.4142136 11.25,12 L11.25,7.75 C11.25,7.33578644 11.5857864,7 12,7 Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Weight Prediction</h3>
                <p className="text-center text-gray-600">How much will she weigh?</p>
                <div className="mt-6 text-center">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">
                    Make Prediction
                  </span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/date-prediction"
                className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <div className="h-16 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center -mt-14 mb-4 mx-auto border-4 border-white shadow-md">
                  <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L16.7071068,9.70710678 L12,14.4142136 L8.29289322,10.7071068 L9.70710678,9.29289322 L12,11.5857864 L15.2928932,8.29289322 Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Birth Date</h3>
                <p className="text-center text-gray-600">When will she arrive?</p>
                <div className="mt-6 text-center">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full">
                    Make Prediction
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Results Button */}
        <div className="text-center mb-12">
          <Link href="/results" 
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            See All Predictions
            <span className="ml-2">→</span>
          </Link>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-pink-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Made with ❤️ for Kelley and Jade Hall</p>
        </div>
      </footer>
    </div>
  );
}
