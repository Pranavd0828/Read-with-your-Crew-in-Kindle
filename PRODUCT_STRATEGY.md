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
We are building a lightweight web prototype that mimics the familiar Kindle interface but optimizes it for action:
1.  **The Home Screen**: Instead of a static library, users see a **Daily Progress Ring** and a "Continue Reading" button that launches their last book instantly. A time-aware greeting ("Good Morning") adds a personal touch.
2.  **The Momentum Bar**: Inside the reader, a progress bar fills up as you read. Meeting the daily goal triggers a **Gold Pulse** animation, providing immediate positive reinforcement without interrupting the flow.
3.  **The Crew**: A dashboard shows who has read today. A "Nudge" feature allows friends to send reminders, protected by a 60-second cooldown to prevent spam.
4.  **The Validation**: To ensuring the streak means something, the system validates that you spend real time (minimum 1 second) on each page.

## How We Built It
We used **React** and **Vite** for a fast, app-like experience.
- **State Management**: We use React Context to track the `lastReadBookId`, `dailyProgress`, and `streak` across the app.
- **Persistence**: All data is saved to `localStorage`, allowing the app to "remember" where you left off without a database.
- **Animations**: CSS transitions power the Momentum Bar and the Gold Pulse, using hardware acceleration for smoothness.
- **Logic**: Custom hooks handle the time validation (1s rule) and the Nudge cooldown timers.
