# Week 6: Asynchronous JavaScript

## Author
- **Name:** Michelle  
- **GitHub:** [@coddy-m](https://github.com/coddy-m)  
- **Date:** March 31, 2026

## Project Description

This project demonstrates a strong understanding of **Asynchronous JavaScript** including Promises, Async/Await, Fetch API, and real-world API integration. 

The main deliverable is a fully functional **Weather Dashboard** that fetches current weather and a 5-day forecast from the OpenWeatherMap API. The dashboard features dynamic backgrounds that change based on weather conditions, recent search history, and smooth user experience.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Transitions, Dynamic Classes)
- Vanilla JavaScript (ES6+)
- Fetch API
- Promises & Async/Await
- localStorage (for persisting recent searches)
- OpenWeatherMap API (Current Weather + 5-Day Forecast)

## Features

### Core Exercises
- Understanding synchronous vs asynchronous code
- Working with Promises and Promise chaining
- Modern Async/Await syntax with proper error handling
- Fetch API for GET and POST requests
- Live search, filter, and sorting of API data

### Main Deliverable: Weather Dashboard
- Search weather by city name
- Display current weather (temperature, feels like, humidity, wind, pressure)
- **5-Day Forecast** with daily cards
- Dynamic background that changes according to weather (Sunny, Rainy, Cloudy, Thunderstorm, etc.)
- Recent searches saved with localStorage
- Loading states and comprehensive error handling
- Responsive and modern UI

## How to Run

1. Clone this repository
2. Open the project folder
3. For exercises: Open `week6-exercises.html` in your browser
4. For the main project:
   - Open `weather-dashboard/index.html`
   - Replace `YOUR_API_KEY_HERE` in the script with your actual OpenWeatherMap API key
   - Search for any city (defaults to Nairobi)

No build tools or installation required.

## Lessons Learned

- How to write clean and readable asynchronous code using `async/await`
- Proper error handling with try/catch blocks when working with APIs
- Managing loading states and user feedback in real applications
- Using `localStorage` to persist user data
- Dynamically updating the UI based on API responses
- Creating visually engaging interfaces with dynamic CSS classes

## Challenges Faced

- **Challenge:** Coordinating current weather and 5-day forecast API calls  
  **Solution:** Used separate async functions and `async/await` for better readability

- **Challenge:** Making background change smoothly based on weather  
  **Solution:** Created dedicated CSS classes for each weather type with smooth transitions

- **Challenge:** Handling API errors gracefully (invalid city, network issues)  
  **Solution:** Implemented comprehensive try/catch and user-friendly error messages

- **Challenge:** Preventing duplicate recent searches  
  **Solution:** Added checks before saving to localStorage

---

**Week 6 Submission** – Asynchronous JavaScript
