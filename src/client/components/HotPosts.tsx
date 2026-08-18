import type { AnalyzedPost } from '../services/sentiment';

interface HotPostsProps {
  posts: AnalyzedPost[];
  subreddit: string;
}

const getSentimentStyle = (sentiment: AnalyzedPost['sentiment']) => {
  switch (sentiment) {
    case 'Positive':
      return {
        emoji: '🟢',
        className: 'text-green-600',
      };

    case 'Negative':
      return {
        emoji: '🔴',
        className: 'text-red-600',
      };

    default:
      return {
        emoji: '🟡',
        className: 'text-gray-500',
      };
  }
};

export const HotPosts = ({
  posts,
  subreddit,
}: HotPostsProps) => {
  return (
    <aside className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-orange-600">Live feed</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Hot posts from {subreddit ? `r/${subreddit}` : 'a subreddit'}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ranked by Reddit hotness and annotated with client-side sentiment.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Visible
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {posts.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        {posts.length === 0 ? (
          <div className="p-6 text-sm leading-6 text-slate-500">
            Pick a subreddit to load the hot-post feed and sentiment badges.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {posts.map((post, index) => {
              const style = getSentimentStyle(post.sentiment);

              return (
                <div
                  key={index}
                  className="grid gap-4 px-4 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Post title
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-800 sm:text-base">
                      {post.title}
                    </p>
                  </div>

                  <div
                    className={`inline-flex items-center justify-self-start rounded-full border px-3 py-2 text-sm font-medium sm:justify-self-end ${style.className === 'text-green-600' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : style.className === 'text-red-600' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 bg-slate-100 text-slate-600'}`}
                  >
                    <span className="mr-2">{style.emoji}</span>
                    {post.sentiment}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
