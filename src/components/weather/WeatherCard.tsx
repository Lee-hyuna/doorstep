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

const DUST_COLOR: Record<string, string> = {
  좋음: "text-blue-500",
  보통: "text-green-500",
  나쁨: "text-orange-500",
  매우나쁨: "text-red-500",
};

export function WeatherCard({ weather }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      {/* 헤더 */}
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

      {/* 기온 */}
      <div className="flex items-end gap-3 mb-5">
        <span className="text-6xl font-bold text-gray-900">
          {weather.currentTemp}°
        </span>
        <div className="pb-2 text-gray-500 text-sm">
          <p>
            최고{" "}
            <span className="text-orange-500 font-semibold">{weather.maxTemp}°</span>
          </p>
          <p>
            최저{" "}
            <span className="text-blue-500 font-semibold">{weather.minTemp}°</span>
          </p>
        </div>
      </div>

      {/* 시간별 예보 타임라인 */}
      <div className="flex justify-between mb-5 overflow-x-auto gap-1">
        {weather.hourlyForecasts.map((f) => (
          <div key={f.hour} className="flex flex-col items-center gap-1 min-w-[44px]">
            <span className="text-xs text-gray-400">
              {f.hour < 12 ? `오전 ${f.hour}` : f.hour === 12 ? "오후 12" : `오후 ${f.hour - 12}`}시
            </span>
            <span className="text-lg leading-none">
              {PRECIP_ICON[f.precipitation] || SKY_ICON[f.sky]}
            </span>
            <span className="text-xs font-semibold text-gray-700">{f.temp}°</span>
            {f.precipitation !== "없음" && (
              <span className="text-[10px] text-blue-500 font-medium">{f.precipitation}</span>
            )}
          </div>
        ))}
      </div>

      {/* 현재 상태 지표 */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="bg-blue-50 rounded-xl py-2.5 px-1">
          <p className="text-blue-400 mb-1">날씨</p>
          <p className="text-gray-700 font-medium">{weather.sky}</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-2.5 px-1">
          <p className="text-blue-400 mb-1">습도</p>
          <p className="text-gray-700 font-medium">{weather.humidity}%</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-2.5 px-1">
          <p className="text-blue-400 mb-1">자외선</p>
          <p className="text-gray-700 font-medium">{weather.uvIndex}</p>
        </div>
        <div className="bg-blue-50 rounded-xl py-2.5 px-1">
          <p className="text-blue-400 mb-1">미세먼지</p>
          <p className={`font-medium ${DUST_COLOR[weather.dustLevel]}`}>
            {weather.dustLevel}
          </p>
        </div>
      </div>
    </div>
  );
}
