import { reddit } from '@devvit/web/server';

export const getHotPosts = async (
  subredditName: string,
  limit: number = 50
) => {
  const posts = await reddit.getHotPosts({
    subredditName,
    limit,
  }).all();

  return posts;
};
