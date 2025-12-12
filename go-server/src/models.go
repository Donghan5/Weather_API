package main

type WeatherRequest struct {
	City string `json:"city" query:"city"`
}

type WeatherData struct {
	City string `json:"city"`
	Temp int    `json:"temperature"`
	Desc string `json:"description"`
}
