import { useEffect, useState } from 'react';

interface HotPostsState {
  titles: string[];
  subreddit: string;
  loading: boolean;
  error: string | null;
}

export const useHotPosts = (subreddit: string) => {
  const [state, setState] = useState<HotPostsState>({
    titles: [],
    subreddit,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!subreddit.trim()) {
      setState({
        titles: [],
        subreddit: '',
        loading: false,
        error: null,
      });
      return;
    }

    const fetchHotPosts = async () => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetch(
          `/api/hot-posts?subreddit=${encodeURIComponent(subreddit)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `HTTP error: ${response.status}`);
        }

        setState({
          titles: data.titles,
          subreddit: data.subreddit,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to fetch Reddit posts:', error);

        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to fetch Reddit posts',
        }));
      }
    };

    void fetchHotPosts();
  }, [subreddit]);

  return state;
};
