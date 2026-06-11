"use client";

import { WeatherAlert } from "@/types/weather";

interface Props {
  alerts: WeatherAlert[];
}

const SEVERITY_STYLE = {
  danger: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const ALERT_ICON: Record<WeatherAlert["type"], string> = {
  rain: "🌧️",
  snow: "❄️",
  temp_drop: "🌡️",
  temp_rise: "☀️",
  uv: "🔆",
  dust: "😷",
};

export function AlertBanner({ alerts }: Props) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${SEVERITY_STYLE[alert.severity]}`}
        >
          <span className="text-lg shrink-0 leading-tight">{ALERT_ICON[alert.type]}</span>
          <p className="leading-snug">{alert.message}</p>
        </div>
      ))}
    </div>
  );
}
