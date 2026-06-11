import { HourlyForecast, PrecipitationType, SkyCondition, WeatherData } from "@/types/weather";

// 실제 기상청 API 연동 전 Mock 데이터
// 기상청 단기예보 API (data.go.kr) 연동 시 이 파일을 교체하면 됩니다.
// API 문서: https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084

export function getMockWeatherData(lat: number, lng: number): WeatherData {
  const locationName = resolveLocationName(lat, lng);
  const tomorrow = new Date(Date.now() + 86400000);
  const month = tomorrow.getMonth() + 1;
  const { minTemp, maxTemp, currentTemp } = getSeasonalTemp(month);

  return {
    locationName,
    date: tomorrow.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }),
    minTemp,
    maxTemp,
    currentTemp,
    sky: "맑음",
    precipitation: "없음",
    humidity: 55,
    windSpeed: 2.5,
    uvIndex: getSeasonalUV(month),
    dustLevel: "보통",
    hourlyForecasts: getMockHourlyForecasts(month, minTemp, maxTemp),
  };
}

function resolveLocationName(lat: number, lng: number): string {
  if (lat >= 37.4 && lat <= 37.7 && lng >= 126.8 && lng <= 127.2) return "서울";
  if (lat >= 35.0 && lat <= 35.3 && lng >= 128.9 && lng <= 129.3) return "부산";
  if (lat >= 35.8 && lat <= 36.1 && lng >= 128.4 && lng <= 128.8) return "대구";
  if (lat >= 37.3 && lat <= 37.6 && lng >= 126.5 && lng <= 126.9) return "인천";
  if (lat >= 35.1 && lat <= 35.3 && lng >= 126.7 && lng <= 127.0) return "광주";
  if (lat >= 36.3 && lat <= 36.5 && lng >= 127.3 && lng <= 127.6) return "대전";
  if (lat >= 35.5 && lat <= 35.6 && lng >= 129.2 && lng <= 129.5) return "울산";
  return "현재 위치";
}

function getSeasonalTemp(month: number): {
  minTemp: number;
  maxTemp: number;
  currentTemp: number;
} {
  const ranges: Record<number, [number, number]> = {
    1: [-7, 1], 2: [-5, 4], 3: [1, 12], 4: [7, 18],
    5: [13, 23], 6: [18, 28], 7: [23, 32], 8: [24, 33],
    9: [17, 26], 10: [10, 20], 11: [3, 12], 12: [-3, 5],
  };
  const [min, max] = ranges[month];
  return { minTemp: min, maxTemp: max, currentTemp: Math.round((min + max) / 2) };
}

function getSeasonalUV(month: number): number {
  const uvMap: Record<number, number> = {
    1: 2, 2: 3, 3: 5, 4: 6, 5: 7, 6: 9,
    7: 8, 8: 9, 9: 7, 10: 5, 11: 3, 12: 2,
  };
  return uvMap[month];
}

function getMockHourlyForecasts(
  month: number,
  minTemp: number,
  maxTemp: number
): HourlyForecast[] {
  // 6시간 단위 예보 (06, 09, 12, 15, 18, 21시)
  const hours = [6, 9, 12, 15, 18, 21];

  return hours.map((hour) => {
    // 기온 곡선: 아침 낮음 → 오후 최고 → 저녁 하락
    const ratio = hour <= 14
      ? (hour - 6) / 8
      : 1 - (hour - 14) / 10;
    const temp = Math.round(minTemp + (maxTemp - minTemp) * Math.max(0, ratio));

    // 오후 3시(15시) 소나기 시나리오 (6월~9월 여름철 패턴)
    const isSummerAfternoon = month >= 6 && month <= 9 && hour === 15;
    const sky: SkyCondition = isSummerAfternoon ? "흐림" : hour < 12 ? "맑음" : "구름많음";
    const precipitation: PrecipitationType = isSummerAfternoon ? "소나기" : "없음";

    return { hour, temp, sky, precipitation };
  });
}
