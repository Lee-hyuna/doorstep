import { WeatherAlert, WeatherData } from "@/types/weather";

export function generateAlerts(weather: WeatherData): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  // 시간대별 소나기/비 예보
  const rainHour = weather.hourlyForecasts.find(
    (f) => f.precipitation === "소나기" || f.precipitation === "비"
  );
  if (rainHour) {
    const label = rainHour.precipitation === "소나기" ? "소나기" : "비";
    alerts.push({
      type: "rain",
      message: `오후 ${rainHour.hour}시부터 ${label} 소식이 있어요! 아침에 우산 꼭 챙기세요.`,
      time: `${rainHour.hour}:00`,
      severity: "warning",
    });
  }

  // 눈 예보
  const snowHour = weather.hourlyForecasts.find(
    (f) => f.precipitation === "눈" || f.precipitation === "비/눈"
  );
  if (snowHour) {
    alerts.push({
      type: "snow",
      message: `오후 ${snowHour.hour}시부터 눈이 올 수 있어요. 미끄러운 도로 주의!`,
      time: `${snowHour.hour}:00`,
      severity: "warning",
    });
  }

  // 급격한 기온 변화 (일교차 10도 이상)
  const tempGap = weather.maxTemp - weather.minTemp;
  if (tempGap >= 10) {
    alerts.push({
      type: "temp_drop",
      message: `오늘 일교차가 ${tempGap}°C예요. 저녁엔 기온이 뚝 떨어지니 겉옷을 꼭 챙기세요.`,
      severity: "info",
    });
  }

  // 자외선 지수
  if (weather.uvIndex >= 8) {
    alerts.push({
      type: "uv",
      message: `자외선 지수 '${weather.uvIndex >= 11 ? "위험" : "매우높음"}'! 선크림과 선글라스를 챙기세요.`,
      severity: weather.uvIndex >= 11 ? "danger" : "warning",
    });
  } else if (weather.uvIndex >= 6) {
    alerts.push({
      type: "uv",
      message: `자외선 지수 '높음'. 낮 12~3시 야외 활동 시 자외선 차단을 권장합니다.`,
      severity: "info",
    });
  }

  // 미세먼지
  if (weather.dustLevel === "매우나쁨") {
    alerts.push({
      type: "dust",
      message: `미세먼지 '매우나쁨'! 외출 시 KF94 마스크 착용을 강력 권장합니다.`,
      severity: "danger",
    });
  } else if (weather.dustLevel === "나쁨") {
    alerts.push({
      type: "dust",
      message: `미세먼지 '나쁨'. 외출 시 마스크를 챙기세요.`,
      severity: "warning",
    });
  }

  // 심각도 높은 것부터 정렬, 최대 3개
  const order = { danger: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 3);
}
