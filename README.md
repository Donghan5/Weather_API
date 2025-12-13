# 🌦️ Weather API (NestJS & Go Implementation)

This project is a Weather API service implemented using two different backend frameworks: **NestJS (Node.js)** and **Go (Fiber)**.
It retrieves real-time weather data from an external API and utilizes **Redis** for caching to minimize redundant external API calls and optimize response times.

## 📋 Project Overview

This project was designed to demonstrate and compare how identical business logic (Caching, External API integration) is implemented across two different technology stacks.

### Key Features

- **Real-time Weather Data**: Retrieves current weather information for a specified city.
- **Smart Caching (Redis)**:
  - Checks if data for the requested city exists in the Redis cache.
  - **Cache Hit**: Returns the stored data immediately (High Performance).
  - **Cache Miss**: Fetches fresh data from the external API, returns it to the user, and saves it to Redis (with TTL).
- **Dual Implementation**:
  - **nestjs-server**: Built with TypeScript, NestJS, Axios, and ioredis.
  - **go-server**: Built with Go, Fiber, and Go-Redis.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend 1** | NestJS (Node.js framework) |
| **Backend 2** | Go (Fiber framework) |
| **Database** | Redis (Dockerized) |
| **External API** | WeatherAPI (or compatible provider) |

## 📂 Project Structure

```bash
Weather_API/
├── .env.example           # Environment variables example
├── excute_redis.sh        # Script to start Redis Docker container
├── nestjs-server/         # NestJS Implementation source code
│   ├── src/
│   │   ├── weather/       # Weather Logic (Controller/Service)
│   │   └── redis/         # Redis Module
│   └── ...
└── go-server/             # Go Implementation source code
    ├── src/
    │   ├── main.go        # Entry point & Routes
    │   ├── service.go     # Business Logic
    │   └── models.go      # Data Structures
    └── go_init_env.sh     # Go module initialization script
```

## 🚀 Getting Started

### 1. Prerequisites

- **Docker** (Required for Redis)
- **Node.js** (v14 or higher) & **npm**
- **Go** (v1.22 or higher)
- **API Key** from a weather data provider (e.g., [WeatherAPI](https://www.weatherapi.com/))

### 2. Environment Configuration

Copy the `.env.example` file to create a `.env` file in the root directory and fill in your API key.

```bash
cp .env.example .env
```

Edit the `.env` file:

```dotenv
WEATHER_API_BASE_URL=https://api.weatherapi.com/v1/current.json
WEATHER_API_KEY=YOUR_API_KEY_HERE
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Start Redis

Use the included script to launch the Redis container.

```bash
./excute_redis.sh
```

> **Note**: Ensure Docker is running before executing the script.

### 4. Running the Servers

You can run either the NestJS server or the Go server. Since they operate on different ports, you can also run them simultaneously.

#### 🟢 Option A: Run NestJS Server (Port: 3000)

```bash
cd nestjs-server/src
npm install
npm run start
```

Server URL: `http://localhost:3000`

#### 🔵 Option B: Run Go Server (Port: 8080)

```bash
cd go-server
# Initialize Go modules (Run once)
./go_init_env.sh

# Run the server
cd src
go run .
```

Server URL: `http://localhost:8080`

## 🧪 How to Test

You can test the API using a web browser, Postman, or curl.

### 📡 API Endpoint

`GET /weather?city={cityname}`

### 1. Browser Testing

- **NestJS Server** (Port 3000):
  [http://localhost:3000/weather?city=Seoul](http://localhost:3000/weather?city=Seoul)

- **Go Server** (Port 8080):
  [http://localhost:8080/weather?city=London](http://localhost:8080/weather?city=London)

### 2. Example Response (JSON)

On a successful request, you will receive a JSON response similar to this:

```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11
  },
  "current": {
    "temp_c": 15.0,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
    }
  }
}
```

### 3. Verifying Cache Behavior

Check the server logs (terminal output) to verify caching:

1.  **First Request**: `Cache Miss. Fetching from API...` (Data fetched from external API)
2.  **Second Request**: `Cache hit for...` (Data fetched from Redis, significantly faster)

## 📝 License

This project is for educational purposes.
link: https://roadmap.sh/projects/weather-api-wrapper-service
