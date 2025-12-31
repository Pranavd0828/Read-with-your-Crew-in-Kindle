# Read with your Crew in Kindle

This project is a social reading prototype that brings the power of accountability to your e-reader. It allows friends to track their daily reading habits together and maintain a shared streak.

## Features

### Library View
*   **Visual Grid**: Displays your book collection in a clean interface.
*   **Progress Tracking**: Shows your current daily streak directly on the home screen.
*   **Navigation**: Easy access to your current reads.

### The Reader
*   **Authentic Experience**: Uses an advanced EPUB engine for a high-fidelity reading experience. It supports custom themes (Light, Dark, Sepia) and adjustable font sizes.
*   **Legacy Support**: Preserves access to older book formats via a specialized text preview mode.
*   **Book Upload**: Allows users to import their own `.epub` or `.mobi` files directly from their device.
*   **Proof of Work**: The app intelligently validates your reading. You must spend a minimum of 2 seconds on a page before it counts as read.
*   **Daily Goals**: Tracks your progress towards a 3-page daily target.
*   **Celebration**: A full-screen animation rewards you with a witty quote when you hit your daily goal.

### The Crew Dashboard
*   **Group Streaks**: View the active streak for your entire group.
*   **Member Status**: See who has finished their reading for the day and who is still working on it.
*   **Nudges**: Send friendly reminders to crew members who are falling behind.
*   **Privacy Controls**: Toggle privacy mode to share your progress without revealing the specific book title you are reading.
*   **Invitations**: Invite new friends to your crew using the built-in modal.

### Demo Utilities
*   **Reset Progress**: A dedicated button in the dashboard allows you to reset your daily progress. This is useful for demonstrating the streak celebration flow from start to finish.

## Technology Stack
*   **Frontend**: React with Vite for fast performance.
*   **Styling**: Vanilla CSS for a custom and lightweight design system.
*   **State Management**: React Context API for managing streaks and user data.
*   **Storage**: LocalStorage for persisting daily progress.
*   **Icons**: Lucide React for consistent visual iconography.

## Getting Started

1.  **Install Dependencies**: Run `npm install` to download the required packages.
2.  **Start the Server**: Run `npm run dev` to launch the application locally.
3.  **Open in Browser**: Navigate to `http://localhost:5173` to view the app.
