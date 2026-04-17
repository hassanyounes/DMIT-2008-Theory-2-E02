import React from "react";
import Image from "next/image";
import Card from "./Card";
import styles from "@/styles/WeatherCard.module.css";

export default function WeatherCard({ weather }) {
  const e = React.createElement;

  if (!weather) {
    return e(
      Card,
      {
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-2",
        title: "Weather",
      },
      e(
        "div",
        { className: styles.content },
        e(
          "p",
          { className: styles.message },
          "Current weather will appear here once the OpenWeatherMap API key is configured."
        ),
        e(
          "p",
          { className: styles.hint },
          "Set `OPENWEATHER_API_KEY` locally and in Netlify."
        )
      )
    );
  }

  return e(
    Card,
    {
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-2",
      title: "Weather",
    },
    e(
      "div",
      { className: styles.content },
      e(
        "div",
        { className: styles.header },
        e(
          "div",
          null,
          e("p", { className: styles.label }, "Current conditions in"),
          e(
            "p",
            { className: styles.location },
            `${weather.city}${weather.country ? `, ${weather.country}` : ""}`
          )
        ),
        weather.iconUrl
          ? e(Image, {
              alt: weather.description,
              height: 72,
              src: weather.iconUrl,
              width: 72,
            })
          : null
      ),
      e(
        "div",
        { className: styles.summary },
        e(
          "div",
          null,
          e("p", { className: styles.temperature }, `${weather.temperature}°C`),
          e("p", { className: styles.description }, weather.description)
        ),
        e(
          "div",
          { className: styles.stats },
          e("p", null, `Feels like ${weather.feelsLike}°C`),
          e("p", null, `Humidity ${weather.humidity}%`),
          e("p", null, `Wind ${weather.windSpeed} m/s`)
        )
      )
    )
  );
}
