# Weather API

A weather API service built with NestJS that fetches and returns weather data from 3rd party APIs. This project demonstrates best practices for working with external APIs, implementing caching strategies, and managing environment variables in a production-ready application.

## 📋 Project Overview

Instead of maintaining our own weather data, this API acts as an intelligent intermediary that:
- Fetches real-time weather data from reliable 3rd party weather services
- Implements caching to improve performance and reduce API calls
- Provides a clean, consistent API interface for weather data retrieval
- Manages API keys and sensitive data through environment variables

This project is an excellent learning resource for understanding how to integrate and work with external APIs in a professional Node.js application.

## 🎯 Learning Objectives

This project helps you understand:

1. **3rd Party API Integration**: How to properly consume external APIs, handle responses, and manage errors
2. **Caching Strategies**: Implementing efficient caching to reduce API costs and improve response times
3. **Environment Variables**: Secure management of API keys and configuration settings
4. **Error Handling**: Robust error handling for external API failures and edge cases
5. **API Design**: Creating a clean, RESTful API interface

## ✨ Features

- **Real-time Weather Data**: Fetch current weather information for any location
- **Intelligent Caching**: Reduce redundant API calls with smart caching mechanisms
- **Environment Configuration**: Secure management of API keys and settings
- **Error Handling**: Comprehensive error handling and meaningful error messages
- **RESTful API**: Clean, intuitive API endpoints
- **Type Safety**: Built with TypeScript for enhanced code quality

## 🛠️ Technologies

- **[NestJS](https://nestjs.com/)**: Progressive Node.js framework for building efficient server-side applications
- **TypeScript**: For type-safe code
- **3rd Party Weather API**: Integration with external weather data providers
- **Caching**: In-memory or Redis caching for performance optimization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API key from a weather data provider (e.g., OpenWeatherMap, WeatherAPI, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Weather_API
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your API credentials to the `.env` file:
```
WEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=https://api.weatherprovider.com
CACHE_TTL=3600
```

5. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Get Current Weather

```
GET /weather?city={city_name}
```

**Parameters:**
- `city` (required): Name of the city

**Response:**
```json
{
  "city": "London",
  "temperature": 15,
  "description": "Partly cloudy",
  "humidity": 65,
  "windSpeed": 12,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Get Weather by Coordinates

```
GET /weather/coordinates?lat={latitude}&lon={longitude}
```

**Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `WEATHER_API_KEY` | API key for the weather service | Yes | - |
| `WEATHER_API_BASE_URL` | Base URL for the weather API | Yes | - |
| `PORT` | Server port | No | 3000 |
| `CACHE_TTL` | Cache time-to-live in seconds | No | 3600 |
| `CACHE_TYPE` | Cache type (memory/redis) | No | memory |

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 Project Structure

```
Weather_API/
├── src/
│   ├── weather/           # Weather module
│   │   ├── weather.controller.ts
│   │   ├── weather.service.ts
│   │   └── weather.module.ts
│   ├── cache/             # Caching module
│   ├── config/            # Configuration files
│   └── main.ts            # Application entry point
├── test/                  # Test files
├── .env.example          # Example environment variables
└── README.md             # Project documentation
```

## 🔐 Security Best Practices

- Never commit `.env` files or API keys to version control
- Use environment variables for all sensitive data
- Implement rate limiting to prevent API abuse
- Validate and sanitize all user inputs
- Keep dependencies up to date

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by 3rd party weather APIs
- Built with [NestJS](https://nestjs.com/)

## 📞 Support

For questions or issues, please open an issue on GitHub.
