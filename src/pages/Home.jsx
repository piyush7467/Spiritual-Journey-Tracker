import React from 'react';
import { useSelector } from 'react-redux';
import HeroPage from './HeroPage';
import PlaceList from './PlaceList';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 safe-area">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🙏</div>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">Connecting to Divine...</h2>
          <FaSpinner className="animate-spin text-amber-600 dark:text-amber-400 text-3xl mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {user ? (
        <PlaceList />
      ) : (
        <HeroPage />
      )}
    </div>
  );
};

export default Home;