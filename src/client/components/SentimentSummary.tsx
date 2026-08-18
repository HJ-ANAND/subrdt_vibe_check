interface SentimentSummaryProps {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  vibeScore: number;
  subreddit: string;
}

export const SentimentSummary = ({
  positive,
  neutral,
  negative,
  total,
  vibeScore,
  subreddit,
}: SentimentSummaryProps) => {
  if (total === 0) {
    return null;
  }

  const positivePercentage = Math.round(
    (positive / total) * 100
  );

  const neutralPercentage = Math.round(
    (neutral / total) * 100
  );

  const negativePercentage = Math.round(
    (negative / total) * 100
  );

  const moodLabel = (() => {
    if (vibeScore >= 60) {
      return 'Positive momentum';
    }

    if (vibeScore >= 40) {
      return 'Balanced discussion';
    }

    return 'Watchful reading';
  })();

  return (
    <section className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-orange-600">
            Sentiment overview
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {subreddit ? `r/${subreddit}` : 'Subreddit sentiment'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {moodLabel} from the latest hot post titles.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Vibe score
          </p>
          <p className="mt-1 text-3xl font-semibold">{vibeScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-700">Positive</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {positive}
          </p>
          <p className="mt-1 text-sm text-emerald-600">
            {positivePercentage}% of analyzed titles
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Neutral</p>
          <p className="mt-2 text-3xl font-semibold text-slate-800">
            {neutral}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {neutralPercentage}% of analyzed titles
          </p>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
          <p className="text-sm font-medium text-rose-700">Negative</p>
          <p className="mt-2 text-3xl font-semibold text-rose-700">
            {negative}
          </p>
          <p className="mt-1 text-sm text-rose-600">
            {negativePercentage}% of analyzed titles
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Analyzed {total} post titles in this session.
      </p>
    </section>
  );
};
