interface SentimentSummaryProps {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export const SentimentSummary = ({
  positive,
  neutral,
  negative,
  total,
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

  return (
    <section className="w-full max-w-2xl mt-8">

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Subreddit Sentiment
      </h2>

      <div className="grid grid-cols-3 gap-3">

        <div className="border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {positive}
          </p>

          <p className="text-sm text-gray-600">
            Positive
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {positivePercentage}%
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">
            {neutral}
          </p>

          <p className="text-sm text-gray-600">
            Neutral
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {neutralPercentage}%
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">
            {negative}
          </p>

          <p className="text-sm text-gray-600">
            Negative
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {negativePercentage}%
          </p>
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-3">
        Analyzed {total} posts
      </p>

    </section>
  );
};
