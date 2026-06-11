export interface WeatherData {
  locationName: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  currentTemp: number;
  sky: SkyCondition;
  precipitation: PrecipitationType;
  humidity: number;
  windSpeed: number;
}

export type SkyCondition = "맑음" | "구름많음" | "흐림";
export type PrecipitationType = "없음" | "비" | "비/눈" | "눈" | "소나기";

export interface OutfitRecommendation {
  level: TempLevel;
  label: string;
  description: string;
  items: OutfitItem[];
  tips: string[];
  rainGear: boolean;
}

export type TempLevel =
  | "very_cold"
  | "cold"
  | "chilly"
  | "cool"
  | "mild"
  | "warm"
  | "hot"
  | "very_hot";

export interface OutfitItem {
  category: "상의" | "하의" | "아우터" | "신발" | "액세서리";
  suggestions: string[];
}

export interface BFFWeatherResponse {
  weather: WeatherData;
  outfit: OutfitRecommendation;
  fetchedAt: string;
}

// 기상청 API 원본 타입
export interface KMAGridPoint {
  nx: number;
  ny: number;
}

export interface KMAForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface KMAApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      dataType: string;
      items: { item: KMAForecastItem[] };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
