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
    <div className="w-full max-w-2xl mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Hot posts from r/{subreddit}
      </h2>

      <div className="flex flex-col gap-3">
        {posts.map((post, index) => {
          const style = getSentimentStyle(post.sentiment);

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex gap-3">
                <span className="text-gray-500 font-medium">
                  {index + 1}
                </span>

                <span className="text-gray-900">
                  {post.title}
                </span>
              </div>

              <span
                className={`whitespace-nowrap font-medium ${style.className}`}
              >
                {style.emoji} {post.sentiment}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
