# Product Strategy

## What Is It
Read with your Crew in Kindle is a social reading prototype designed to make daily reading a shared habit. It transforms the solitary activity of reading on a Kindle into a collective experience. Users form small groups or "crews" to track their daily reading goals together. The core mechanic is simple: if you read your daily quota, you keep your streak alive. If you invite friends, you keep the group streak alive together.

## Why Build This
Kindle devices track your reading data, but they hide these insights deep within the settings menu. They offer no immediate feedback to help you build a habit, leaving the most motivating data buried and unused.

Our project solves this problem by bringing streaks and habit-building to the forefront. We take the data that Kindle hides and make it the meaningful center of the experience. By visualizing daily progress and adding social accountability, we turn a solitary, hidden activity into a celebrated daily achievement.

## Why Streak
The streak is the most powerful psychological hook for habit formation. It creates a daily urgency that helps users prioritize reading amidst their busy schedules. A group streak amplifies this effect. No one wants to be the person who breaks the chain for everyone else. This shared responsibility fosters a stronger commitment than individual willpower alone.

## Why Now
Digital reading is mature, but social reading is stagnant. People share book recommendations on TikTok or Goodreads, but the act of reading remains isolated. At the same time, users are craving more meaningful digital connections that go beyond passive scrolling. A platform that unites friends around intellectual growth and shared stories fits perfectly into this cultural moment.

## How It Works
We are building a lightweight web prototype that mimics the familiar Kindle interface to reduce friction.
1.  **The Library**: Users see their current books in a clean and distraction-free grid. The library supports both curated classics and personal file uploads.
2.  **The Reader**: An advanced e-reader experience allows users to read real EPUB books with custom themes. It verifies engagement by measuring time spent on each page.
3.  **The Crew**: A dashboard shows who has read today and who needs a nudge. Privacy controls allow users to keep their book titles hidden while still sharing their progress.
4.  **The Celebration**: Completing the daily goal triggers a rewarding visual celebration to reinforce the habit loop.

## How We Built It
We built this application using React and Vite to ensure a fast and responsive user experience. The core reading engine processes standard EPUB files directly in the browser, allowing for high-fidelity text rendering. To track habits accurately, we implemented a smart validation system that measures the time spent on each page, ensuring users are actually reading rather than just clicking through. Finally, we store all streak data locally on the user's device, which allows for persistent tracking without the need for a complex server infrastructure.
