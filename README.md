# Netro Hospital Mobile App

React Native mobile application built with **Expo** and **Redux Toolkit** for patient appointment booking and hospital services.

## Features
- **Expo & React Native**: Fast cross-platform mobile development for Android, iOS, and Web.
- **Redux Toolkit State Architecture**:
  - `authSlice`: Patient profile and authentication state.
  - `hospitalSlice`: Hospital departments, doctors directory, and category filtering.
  - `appointmentSlice`: Patient appointments schedule, booking, and cancellation.
- **Interactive UI**:
  - 24/7 Emergency medical hotline banner.
  - Department categorization and doctor specialty filtering.
  - Doctor booking modal connected to Redux.
  - My Appointments manager with upcoming schedule and cancellation.

## Tech Stack
- **React Native (0.88.0)**
- **Expo (~58.0)**
- **Redux Toolkit (@reduxjs/toolkit)**
- **React Redux (react-redux)**

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npm start
   ```

3. Run on specific platform:
   ```bash
   npm run android  # for Android device/emulator
   npm run ios      # for iOS simulator
   npm run web      # for Web browser preview
   ```
