# Habit Tracker

A personal habit tracking app built with **React**, **TypeScript**, and **Vite**. Track your daily progress across custom habit types — from workouts and skills to reading and mindfulness — all in one place.

---

## Description

Habit Tracker lets you define your own habit types and the specific data you want to log for each one. Every day, you open the calendar, pick a date, and record your activity per habit type. Over time, you build a detailed history of your progress that you can review and reflect on.

The core idea is flexibility: instead of a fixed list of habits, you design your own — choose what fields matter to you (duration, reps, notes, rating, etc.) and log accordingly.

---

## Potential Features

### Core

- **Custom habit types** — define your own habits (e.g., "Workout", "Reading", "Skill practice") with a name, icon, and color
- **Custom fields per habit** — for each habit type, define the data you want to log (text, number, duration, rating, checkbox, etc.)
- **Calendar view** — monthly calendar showing which days have logged entries and at a glance how active you were
- **Daily log** — click any day on the calendar to view or add entries for each habit type
- **Entry form** — dynamic form generated from the habit type's field definitions

### Habits

- **Physical activity** — log exercise type, duration, reps, distance, notes
- **Skills & learning** — log what you practiced, for how long, resources used
- **Reading** — book title, pages read, notes
- **Custom habits** — any habit you can define with your own fields

### Analytics & History

- **Streak tracking** — current and longest streak per habit type
- **Progress charts** — visualize your data over time (bar, line charts)
- **Monthly/weekly summary** — overview of activity per habit type
- **Heatmap** — GitHub-style contribution heatmap per habit

### UX

- **Dark / light mode**
- **Responsive design** — works on mobile and desktop
- **Local storage persistence** — no backend required to get started
- **Data export** — export your logs as JSON or CSV

### Future / Nice to have

- **Reminders / notifications** — push reminders for daily logging
- **Goals** — set targets per habit (e.g., exercise 4x/week) and track progress toward them
- **Tags** — tag entries for filtering and grouping
- **Cloud sync** — optional backend to sync across devices
- **Multi-user** — separate profiles on the same device

---

## Tech Stack

| Tool              | Purpose                   |
| ----------------- | ------------------------- |
| React 19          | UI framework              |
| TypeScript        | Type safety               |
| Vite              | Build tool & dev server   |
| ESLint + Prettier | Code quality & formatting |

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |
