import './index.css';

import { SentimentSummary } from './components/SentimentSummary';
import { useSentiment } from './hooks/useSentiment';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { HotPosts } from './components/HotPosts';
import { useHotPosts } from './hooks/useHotPosts';

const quickPicks = [
  'programming',
  'reactjs',
  'technology',
  'askreddit',
  'worldnews',
  'nba',
];

const formatMood = (value: number) => {
  if (value >= 0.6) {
    return 'Very positive';
  }

  if (value >= 0.4) {
    return 'Mostly positive';
  }

  if (value >= 0.25) {
    return 'Mixed signal';
  }

  if (value >= 0.1) {
    return 'Neutral mix';
  }

  return 'Needs more signal';
};

export const App = () => {
  const [subredditInput, setSubredditInput] = useState('');
  const [subreddit, setSubreddit] = useState('');

  const {
    titles,
    loading,
    error,
  } = useHotPosts(subreddit);

  const { posts, summary } = useSentiment(titles);

  const vibeScore = summary.total
    ? Math.round(
        ((summary.positive + summary.neutral * 0.5) / summary.total) * 100
      )
    : 0;

  const dominantMood = formatMood(vibeScore / 100);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,97,0,0.18),transparent_36%),linear-gradient(180deg,#fffaf6_0%,#f6f8fc_42%,#eef2f7_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-4xl border border-white/70 bg-slate-950 text-white shadow-[0_20px_80px_-30px_rgba(15,23,42,0.75)]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-orange-200">
                Reddit sentiment dashboard
              </div>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Subreddit Vibe Check
                </h1>

                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Inspect the hottest 50 posts in any subreddit, then read the
                  mood at a glance with a clean, interview-ready dashboard.
                </p>
              </div>

              <div className="rounded-3xl border border-orange-300/20 bg-white/6 p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)] backdrop-blur sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      r/
                    </span>

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
                      className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-10 pr-4 text-base font-medium text-slate-900 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.65)] outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-2xl border border-orange-200 bg-linear-to-r from-[#ff5a1f] to-[#ff7a26] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_36px_-18px_rgba(255,90,31,0.95)] transition hover:brightness-110 hover:shadow-[0_18px_42px_-18px_rgba(255,90,31,0.98)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Checking...' : 'Check vibe'}
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-400">
                  Search is the main action here. Try a quick pick if you want a
                  fast comparison.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Posts analyzed
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {summary.total || '50'}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Hot post titles only
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Vibe score
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{vibeScore}%</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {dominantMood}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Current subreddit
                  </p>
                  <p className="mt-2 truncate text-2xl font-semibold">
                    {subreddit ? `r/${subreddit}` : 'Choose one'}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Search or try a quick pick
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <p className="text-sm font-medium text-orange-200">
                Quick picks
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {quickPicks.map((pick) => (
                  <button
                    key={pick}
                    type="button"
                    onClick={() => {
                      setSubredditInput(pick);
                      setSubreddit(pick);
                    }}
                    className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-slate-100 transition hover:border-orange-300/50 hover:bg-white/12"
                  >
                    r/{pick}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  How it works
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Pick a subreddit, fetch the hot posts endpoint, run client-side
                  sentiment analysis, and summarize the conversation tone in one
                  view.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          {loading && !error && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-4 py-6 text-sm text-slate-600 shadow-sm backdrop-blur">
              Fetching hot posts and analyzing title sentiment...
            </div>
          )}

          <SentimentSummary
            positive={summary.positive}
            neutral={summary.neutral}
            negative={summary.negative}
            total={summary.total}
            vibeScore={vibeScore}
            subreddit={subreddit}
          />

          <HotPosts
            posts={posts}
            subreddit={subreddit}
          />
        </section>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
