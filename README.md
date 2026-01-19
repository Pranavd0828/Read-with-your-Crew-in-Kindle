# Read with your Crew in Kindle

This is a **social reading prototype** that transforms the solitary act of reading into a shared, habit-building experience. It focuses on **accountability** and **immediate feedback** to help friends maintain a daily reading streak together.

## Why This Exists
Kindle devices track your reading data but hide it deep in settings menus. This project brings that data to the forefront. By visualizing your progress and connecting you with a "crew," we turn reading from a hidden activity into a celebrated daily achievement.

---

## Key Features

### 1. Action-First Home Screen
We redesigned the library to focus on **habit** rather than just storage.
- **Daily Progress Ring**: The first thing you see is a large ring visualizing your progress toward your daily goal (e.g., 3 pages).
- **Dynamic Greeting**: The app welcomes you with "Good Morning," "Good Afternoon," or "Good Evening" based on your local time.
- **"Continue Reading" Button**: A prominent button instantly launches your last-read book, removing friction so you can start reading in seconds.

### 2. The Momentum Bar (In-Reader)
We believe feedback should happen *while* you read, not just after.
- **Visual Progress**: A thin orange bar at the very top of the reader fills up as you read pages.
- **Gold Pulse**: When you hit your daily goal, the bar turns **Gold** and pulses. This gives you an immediate dopamine hit without needing to leave the book.

### 3. Validated Reading (Proof of Work)
You can't just click through pages to cheat.
- **Time Validation**: The app requires you to spend a minimum of **1 second** on a page for it to count.
- **Smart Tracking**: If you flip too fast, the app gently nudges you to "Read slightly longer to count!"

### 4. The Crew Dashboard
A dedicated space for social accountability.
- **Group Streaks**: See the active streak for your entire crew.
- **Nudge Button**: Send a friendly reminder to friends who haven't read yet.
    - **Anti-Spam Cooldown**: To prevent annoyance, you can only nudge a friend once every **60 seconds**. The button disables and shows a "Sent" state during this time.

### 5. Full Reader Support
- **EPUB & MOBI**: Supports standard ebook formats.
- **Customization**: Adjust font size and themes (Light, Dark, Sepia).
- **Persistence**: Your progress and current book are saved automatically to your device.

---

## Technical Overview
- **Frontend**: React (v18+) with Vite.
- **State**: React Context API for global state (streaks, user progress, books).
- **Storage**: `localStorage` is used to persist your streak, daily progress, and last-read book ID. No account creation required.
- **Routing**: `react-router-dom` (HashRouter) for seamless navigation on GitHub Pages.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Locally**:
    ```bash
    npm run dev
    ```
3.  **Deploy**:
    ```bash
    npm run deploy
    ```
