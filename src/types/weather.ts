export interface HourlyForecast {
  hour: number;
  temp: number;
  sky: SkyCondition;
  precipitation: PrecipitationType;
}

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
  uvIndex: number;
  dustLevel: "좋음" | "보통" | "나쁨" | "매우나쁨";
  hourlyForecasts: HourlyForecast[];
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
  imageUrl?: string;
}

export interface WeatherAlert {
  type: "rain" | "snow" | "temp_drop" | "temp_rise" | "uv" | "dust";
  message: string;
  time?: string;
  severity: "info" | "warning" | "danger";
}

export type PromotionTrigger =
  | "rain"
  | "snow"
  | "temp_drop_sharp"
  | "uv_high"
  | "dust_bad"
  | "hot"
  | "cold";

export interface PromotionCard {
  id: string;
  trigger: PromotionTrigger;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  imageEmoji: string;
  priority: number;
}

export interface BFFWeatherResponse {
  weather: WeatherData;
  outfit: OutfitRecommendation;
  alerts: WeatherAlert[];
  promotions: PromotionCard[];
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
