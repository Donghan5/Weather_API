
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)


var ctx = context.Background()

type WeatherService struct {
	Redis *redis.Client
}

func NewWeatherService(rdb *redis.Client) *WeatherService {
	return &WeatherService{
		Redis: rdb,
	}
}

func (s *WeatherService) GetWeather(city string) (map[string]interface{}, error) {
	cacheKey := "weather:" + city

	val, err := s.Redis.Get(ctx, cacheKey).Result()
	if err == nil {
		fmt.Println("Cache hit for city:", city)
		var data map[string]interface{}
		json.Unmarshal([]byte(val), &data)
		return data, nil
	}

	fmt.Println("Cache miss. Fetching from API for city:", city)

	apiKey := os.Getenv("WEATHER_API_KEY")
	baseUrl := os.Getenv("WEATHER_API_BASE_URL")

	url := fmt.Sprintf("%s/%s?key=%s&unitGroup=metric&contentType=json", baseUrl, city, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	s.Redis.Set(ctx, cacheKey, body, 43200*time.Second)

	var weatherData map[string]interface{}
	json.Unmarshal(body, &weatherData)

	return weatherData, nil
}