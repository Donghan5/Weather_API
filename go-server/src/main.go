package main

import (
	"context"
	"log"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func loadEnv() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("No .env file found, using system environment variables")
	}
}

func connectRedis() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT"),
	})

	log.Println("Send the ping to check the connection...")
	if err := rdb.Ping(context.Background()).Err(); err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	} else {
		log.Println("Connected to Redis successfully!")
	}
	return rdb
}

func setupRoutes(app *fiber.App, service *WeatherService) {
	app.Get("/weather", func(c *fiber.Ctx) error {
		city := c.Query("city")

		if city == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "City is required",
			})
		}

		data, err := service.GetWeather(strings.ToLower(city))
		if err != nil {
			log.Println("Error fetching weather data:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to fetch weather data",
			})
		}

		return c.JSON(data)
	})
}

func main() {
	loadEnv()
	rdb := connectRedis()
	app := fiber.New()
	service := NewWeatherService(rdb)
	setupRoutes(app, service)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(app.Listen(":" + port))
}
