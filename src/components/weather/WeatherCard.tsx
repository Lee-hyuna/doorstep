"use client";

import { WeatherData } from "@/types/weather";

interface Props {
  weather: WeatherData;
}

const SKY_ICON: Record<string, string> = {
  맑음: "☀️",
  구름많음: "⛅",
  흐림: "☁️",
};

const PRECIP_ICON: Record<string, string> = {
  없음: "",
  비: "🌧️",
  "비/눈": "🌨️",
  눈: "❄️",
  소나기: "🌦️",
};

export function WeatherCard({ weather }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">{weather.date}</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            📍 {weather.locationName}
          </h2>
        </div>
        <div className="text-5xl">
          {PRECIP_ICON[weather.precipitation] || SKY_ICON[weather.sky]}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-6xl font-bold text-gray-900">
          {weather.currentTemp}°
        </span>
        <div className="pb-2 text-gray-500 text-sm">
          <p>
            최고{" "}
            <span className="text-orange-500 font-semibold">
              {weather.maxTemp}°
            </span>
          </p>
          <p>
            최저{" "}
            <span className="text-blue-500 font-semibold">
              {weather.minTemp}°
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-blue-50 rounded-xl py-3 px-2">
          <p className="text-blue-400 text-xs mb-1">날씨</p>
          <p className="text-gray-700 font-medium">{weather.sky}</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-3 px-2">
          <p className="text-blue-400 text-xs mb-1">습도</p>
          <p className="text-gray-700 font-medium">{weather.humidity}%</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-3 px-2">
          <p className="text-blue-400 text-xs mb-1">풍속</p>
          <p className="text-gray-700 font-medium">{weather.windSpeed}m/s</p>
        </div>
      </div>
    </div>
  );
}
