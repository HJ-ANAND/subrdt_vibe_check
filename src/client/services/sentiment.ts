import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export type SentimentLabel =
  | 'Positive'
  | 'Neutral'
  | 'Negative';

export interface AnalyzedPost {
  title: string;
  score: number;
  sentiment: SentimentLabel;
}

const getSentimentLabel = (score: number): SentimentLabel => {
  if (score > 0) {
    return 'Positive';
  }

  if (score < 0) {
    return 'Negative';
  }

  return 'Neutral';
};

export const analyzeSentiment = (
  title: string
): AnalyzedPost => {
  const result = sentiment.analyze(title);

  return {
    title,
    score: result.score,
    sentiment: getSentimentLabel(result.score),
  };
};

export const analyzePosts = (
  titles: string[]
): AnalyzedPost[] => {
  return titles.map(analyzeSentiment);
};
