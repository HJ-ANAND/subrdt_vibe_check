import './index.css';

import { SentimentSummary } from './components/SentimentSummary';
import { useSentiment } from './hooks/useSentiment';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { HotPosts } from './components/HotPosts';
import { useHotPosts } from './hooks/useHotPosts';

export const App = () => {
  const [subredditInput, setSubredditInput] = useState('');
  const [subreddit, setSubreddit] = useState('');

  const {
    titles,
    loading,
    error,
  } = useHotPosts(subreddit);

  const {posts, summary } = useSentiment(titles);

  const handleCheck = () => {
    const name = subredditInput
      .trim()
      .replace(/^r\//, '');

    if (!name) {
      return;
    }

    setSubreddit(name);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">

      <div className="w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Subreddit Vibe Check
        </h1>

        <p className="mt-2 text-gray-600">
          Check the latest hot posts from any subreddit.
        </p>

        <div className="flex gap-3 mt-6">

          <input
            type="text"
            placeholder="Enter subreddit e.g. programming"
            value={subredditInput}
            onChange={(e) => setSubredditInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCheck();
              }
            }}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />

          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-[#d93900] text-white px-6 py-3 rounded-lg hover:bg-[#c23300] disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Check'}
          </button>

        </div>

        {error && (
          <p className="mt-4 text-red-600">
            {error}
          </p>
        )}

        <SentimentSummary
          positive={summary.positive}
          neutral={summary.neutral}
          negative={summary.negative}
          total={summary.total}
        />

        <HotPosts
          posts={posts}
          subreddit={subreddit}
        />

      </div>

    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
