const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

function formatLocationFromTimeZone(zone = "") {
  const parts = zone.split("/");
  const locationPart = parts[parts.length - 1];

  return locationPart ? locationPart.replaceAll("_", " ") : "";
}

export function getWeatherLocation(profile) {
  return (
    profile?.weather?.location ||
    formatLocationFromTimeZone(profile?.timeZone?.zone) ||
    profile?.contacts?.location ||
    ""
  );
}

export async function getWeather({
  apiKey,
  location,
  fetchImpl = fetch,
} = {}) {
  if (!apiKey || !location) {
    return null;
  }

  const params = new URLSearchParams({
    appid: apiKey,
    q: location,
    units: "metric",
  });

  const response = await fetchImpl(`${OPEN_WEATHER_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`);
  }

  const data = await response.json();
  const weather = data.weather?.[0];

  return {
    city: data.name,
    country: data.sys?.country,
    description: weather?.description ?? "Unavailable",
    iconUrl: weather?.icon
      ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
      : null,
    temperature: Math.round(data.main?.temp ?? 0),
    feelsLike: Math.round(data.main?.feels_like ?? 0),
    humidity: data.main?.humidity ?? 0,
    windSpeed: Math.round((data.wind?.speed ?? 0) * 10) / 10,
  };
}
