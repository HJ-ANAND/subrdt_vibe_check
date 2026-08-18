import { useMemo } from 'react';
import {
  analyzePosts,
  type AnalyzedPost,
} from '../services/sentiment';

interface SentimentSummary {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export const useSentiment = (titles: string[]) => {
  const posts: AnalyzedPost[] = useMemo(
    () => analyzePosts(titles),
    [titles]
  );

  const summary: SentimentSummary = useMemo(() => {
    const positive = posts.filter(
      (post) => post.sentiment === 'Positive'
    ).length;

    const neutral = posts.filter(
      (post) => post.sentiment === 'Neutral'
    ).length;

    const negative = posts.filter(
      (post) => post.sentiment === 'Negative'
    ).length;

    return {
      positive,
      neutral,
      negative,
      total: posts.length,
    };
  }, [posts]);

  return {
    posts,
    summary,
  };
};
