import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4 bg-white dark:bg-gray-900">

      <img
        className="object-contain w-1/2 max-w-[250px] mx-auto"
        src="/snoo.png"
        alt="Snoo"
      />

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Hey {context.username ?? 'user'} 👋
        </h1>

        <p className="text-base text-center text-gray-600 dark:text-gray-300">
          Welcome to Subreddit Vibe Check
        </p>
      </div>

      <button
        className="bg-[#d93900] text-white px-6 py-3 rounded-full cursor-pointer hover:bg-[#c23300]"
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
      >
        Start Vibe Check
      </button>

    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
