package main

import (
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

	return rdb
}

func setupRoutes(app *fiber.App, rdb *redis.Client) {
	app.Get("/weather", func(c *fiber.Ctx) error {
		city := c.Query("city")

		if city == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "City is required",
			})
		}

		data, err := getWeatherData(strings.ToLower(city))
		if err != nil {
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
	setupRoutes(app, rdb)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Fatal(app.Listen(":8080"))
}
