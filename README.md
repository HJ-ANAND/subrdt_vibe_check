# Subreddit Vibe Check

A Reddit Devvit Web application that lets users enter a public subreddit and quickly understand its current "vibe" by analyzing the latest 50 hot posts.

## Overview

**Subreddit Vibe Check** retrieves the latest hot posts from a user-selected subreddit, performs sentiment analysis on the post titles, and presents the results through a simple dashboard.

Instead of manually going through dozens of posts to understand what a community is talking about, the application provides a quick overview of the overall sentiment and shows the sentiment of individual posts.

## Features

- **Subreddit Search** — Enter a subreddit name and analyze it.
- **Hot Posts** — Fetches the latest 50 hot posts from the selected subreddit.
- **Sentiment Analysis** — Classifies post titles as Positive, Neutral, or Negative.
- **Sentiment Summary** — Displays the number and percentage of posts in each sentiment category.
- **Post-Level Sentiment** — Shows the sentiment classification alongside individual hot posts.
- **Loading & Error Handling** — Provides feedback while fetching data and when a subreddit cannot be processed.
- **Devvit Web Integration** — Runs directly within Reddit using the Devvit platform.

## Tech Stack

- **TypeScript**
- **React**
- **Vite**
- **Tailwind CSS**
- **Reddit Devvit**
- **Reddit API**
- **Sentiment** — client-side sentiment analysis library

## Project Structure

```text
src/
├── client/
│   ├── components/
│   │   ├── HotPosts.tsx
│   │   └── SentimentSummary.tsx
│   ├── hooks/
│   │   ├── useCounter.ts
│   │   ├── useHotPosts.ts
│   │   └── useSentiment.ts
│   ├── services/
│   │   └── sentiment.ts
│   ├── game.tsx
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── hotposts.ts
│   │   └── ...
│   └── services/
│       └── reddit.ts
└── shared/
```

## How It Works

```text
User enters subreddit
        ↓
Application requests hot posts
        ↓
Reddit returns the latest 50 posts
        ↓
Post titles are analyzed
        ↓
Sentiment is assigned
        ↓
Positive / Neutral / Negative counts are calculated
        ↓
Dashboard displays the results
```

## Example

For a subreddit such as `r/gaming`, the application can produce a summary like:

```text
Subreddit Sentiment

Positive    21  (42%)
Neutral     18  (36%)
Negative    11  (22%)

Analyzed 50 posts
```

Individual posts are also displayed with their corresponding sentiment.

## Sentiment Analysis

The application currently performs sentiment analysis on **post titles**.

| Sentiment | Meaning |
|---|---|
| 🟢 Positive | The title has an overall positive sentiment |
| 🟡 Neutral | The title has little or mixed emotional polarity |
| 🔴 Negative | The title has an overall negative sentiment |

The summary percentages are calculated from the analyzed posts.

## Running Locally

### Prerequisites

- Node.js
- npm
- A Reddit account
- Devvit CLI configured

### Installation

```bash
git clone https://github.com/HJ-ANAND/subrdit_vibe_check.git
cd subrdit_vibe_check
npm install
```

Start the development environment:

```bash
npm run dev
```

The application can then be tested through the Devvit development environment.

## Testing

The application has been tested with multiple publicly accessible subreddits and different user inputs.

The main flow tested was:

1. Enter a subreddit.
2. Fetch 50 hot posts.
3. Analyze the post titles.
4. Display the overall sentiment distribution.
5. Display individual posts with their sentiment.
6. Verify the application works in the Reddit environment.

## Data & Permissions

The application is designed as a read-only analysis tool.

It retrieves the Reddit post data required for the analysis and does not:

- Create posts
- Edit posts
- Delete posts
- Moderate posts
- Modify comments
- Perform actions on behalf of users

## Purpose

The goal of **Subreddit Vibe Check** is to provide a quick, easy-to-understand snapshot of the current mood of a Reddit community.

It can help users understand whether recent discussions in a subreddit are generally positive, neutral, or negative without manually reading every post.

## Current Scope

The current version analyzes the **titles of the latest 50 hot posts**.

Possible future improvements include:

- Comment sentiment analysis
- Historical sentiment tracking
- Sentiment trends over time
- More detailed topic analysis
- Sentiment visualizations
- Additional Reddit post metadata

## Author

**Harshjeet Anand**

B.Tech Computer Science Engineering

GitHub: https://github.com/HJ-ANAND

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Reddit Devvit.
