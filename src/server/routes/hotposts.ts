import { Hono } from 'hono';
import { getHotPosts } from '../services/reddit';

export const hotPostsApi = new Hono();

hotPostsApi.get('/', async (c) => {
  try {
    const subreddit = c.req.query('subreddit') || 'programming';

    const posts = await getHotPosts(subreddit, 50);

    const titles = posts.map((post) => post.title);

    console.log('===== REDDIT HOT POSTS =====');
    console.log(`Subreddit: r/${subreddit}`);
    console.log(`Total posts: ${titles.length}`);

    titles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });

    return c.json({
      subreddit,
      count: titles.length,
      titles,
    });
  } catch (error) {
    console.error('Failed to fetch Reddit hot posts:', error);

    return c.json(
      {
        status: 'error',
        message: 'Failed to fetch Reddit posts',
      },
      500
    );
  }
});
