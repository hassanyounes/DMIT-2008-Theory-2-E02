import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard.jsx";

describe("WeatherCard", () => {
  it("renders weather details", () => {
    render(
      React.createElement(WeatherCard, {
        weather: {
          city: "Edmonton",
          country: "CA",
          description: "clear sky",
          iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
          temperature: 18,
          feelsLike: 16,
          humidity: 45,
          windSpeed: 3.5,
        },
      })
    );

    expect(screen.getByText("Edmonton, CA")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
    expect(screen.getByText("Feels like 16°C")).toBeInTheDocument();
    expect(screen.getByAltText("clear sky")).toBeInTheDocument();
  });

  it("renders setup guidance when weather data is unavailable", () => {
    render(React.createElement(WeatherCard, { weather: null }));

    expect(
      screen.getByText(/Current weather will appear here once the OpenWeatherMap API key is configured/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/OPENWEATHER_API_KEY/i)).toBeInTheDocument();
  });
});
