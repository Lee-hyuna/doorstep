import { WeatherData } from "@/types/weather";

// 실제 기상청 API 연동 전 Mock 데이터
// 기상청 단기예보 API (data.go.kr) 연동 시 이 파일을 교체하면 됩니다.
// API 문서: https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084

export function getMockWeatherData(lat: number, lng: number): WeatherData {
  // 위도/경도를 기반으로 지역명 추정 (단순화)
  const locationName = resolveLocationName(lat, lng);

  // 계절에 따른 현실적인 목 데이터
  const month = new Date().getMonth() + 1;
  const { minTemp, maxTemp, currentTemp } = getSeasonalTemp(month);

  return {
    locationName,
    date: new Date().toLocaleDateString("ko-KR", {
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
  };
}

function resolveLocationName(lat: number, lng: number): string {
  // 주요 도시 경계 단순 매핑
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
  // 서울 평균 기온 기준 계절별 범위
  const ranges: Record<number, [number, number]> = {
    1: [-7, 1],
    2: [-5, 4],
    3: [1, 12],
    4: [7, 18],
    5: [13, 23],
    6: [18, 28],
    7: [23, 32],
    8: [24, 33],
    9: [17, 26],
    10: [10, 20],
    11: [3, 12],
    12: [-3, 5],
  };
  const [min, max] = ranges[month];
  const current = Math.round((min + max) / 2);
  return { minTemp: min, maxTemp: max, currentTemp: current };
}
