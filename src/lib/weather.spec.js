import { http, HttpResponse } from "msw";
import { getWeather, getWeatherLocation } from "./weather";
import { server } from "@/test/msw/server";

describe("getWeatherLocation", () => {
  it("prefers the explicit weather location", () => {
    expect(
      getWeatherLocation({
        weather: { location: "Edmonton,CA" },
        timeZone: { zone: "America/Toronto" },
        contacts: { location: "Toronto, Ontario" },
      })
    ).toBe("Edmonton,CA");
  });

  it("falls back to the timezone city", () => {
    expect(
      getWeatherLocation({
        timeZone: { zone: "America/Edmonton" },
        contacts: { location: "Calgary, Alberta" },
      })
    ).toBe("Edmonton");
  });
});

describe("getWeather", () => {
  it("returns null when the API key is missing", async () => {
    await expect(getWeather({ location: "Edmonton" })).resolves.toBeNull();
  });

  it("normalizes weather data from the OpenWeatherMap API", async () => {
    server.use(
      http.get("https://api.openweathermap.org/data/2.5/weather", () =>
        HttpResponse.json({
          name: "Edmonton",
          sys: { country: "CA" },
          weather: [{ description: "clear sky", icon: "01d" }],
          main: { temp: 17.6, feels_like: 15.9, humidity: 42 },
          wind: { speed: 3.45 },
        })
      )
    );

    await expect(
      getWeather({ apiKey: "test-key", location: "Edmonton" })
    ).resolves.toEqual({
      city: "Edmonton",
      country: "CA",
      description: "clear sky",
      iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
      temperature: 18,
      feelsLike: 16,
      humidity: 42,
      windSpeed: 3.5,
    });
  });

  it("throws when the weather request fails", async () => {
    server.use(
      http.get("https://api.openweathermap.org/data/2.5/weather", () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    await expect(
      getWeather({ apiKey: "test-key", location: "Edmonton" })
    ).rejects.toThrow("Weather request failed with status 500");
  });
});
