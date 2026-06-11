import { PromotionCard, PromotionTrigger, WeatherData } from "@/types/weather";

// 실제 운영 시 CMS/DB로 교체 가능한 프로모션 카탈로그
const PROMOTION_CATALOG: PromotionCard[] = [
  {
    id: "umbrella-store",
    trigger: "rain",
    badge: "☂️ 우산",
    title: "소나기 대비! 편의점 우산 쿠폰",
    description: "지금 근처 편의점에서 우산 구매 시 20% 할인. 공유 우산 서비스도 이용 가능해요.",
    ctaLabel: "쿠폰 받기",
    ctaUrl: "#umbrella-coupon",
    imageEmoji: "🏪",
    priority: 10,
  },
  {
    id: "umbrella-share",
    trigger: "rain",
    badge: "☂️ 공유 우산",
    title: "우산 없어도 걱정 없어요",
    description: "공유 우산 서비스 첫 이용 무료. 앱에서 근처 대여소를 찾아보세요.",
    ctaLabel: "대여소 찾기",
    ctaUrl: "#umbrella-share",
    imageEmoji: "🌂",
    priority: 9,
  },
  {
    id: "muffler-rocket",
    trigger: "temp_drop_sharp",
    badge: "🚀 로켓배송",
    title: "기온 급락! 내일 아침 목도리 로켓배송",
    description: "지금 주문 시 내일 아침 도착. 따뜻한 울 목도리 특가로 만나보세요.",
    ctaLabel: "목도리 보러가기",
    ctaUrl: "#muffler-rocket",
    imageEmoji: "🧣",
    priority: 8,
  },
  {
    id: "sunscreen-uv",
    trigger: "uv_high",
    badge: "☀️ 자외선 주의",
    title: "자외선 지수 매우 높음! 선크림 필수",
    description: "긴소매 셔츠와 함께 바를 SPF50+ 선크림. 피부과 추천 제품 모음.",
    ctaLabel: "선크림 보러가기",
    ctaUrl: "#sunscreen",
    imageEmoji: "🧴",
    priority: 7,
  },
  {
    id: "mask-dust",
    trigger: "dust_bad",
    badge: "😷 미세먼지",
    title: "미세먼지 최악! KF94 마스크 추천",
    description: "화사한 봄 재킷에 어울리는 컬러 KF94 마스크. 오늘 바로 받아보세요.",
    ctaLabel: "마스크 보러가기",
    ctaUrl: "#kf94-mask",
    imageEmoji: "🫁",
    priority: 9,
  },
  {
    id: "cool-wear",
    trigger: "hot",
    badge: "🌡️ 폭염",
    title: "오늘도 더위와의 싸움",
    description: "쿨링 소재 반팔 티셔츠 특가! 땀 흡수 빠른 기능성 소재로 시원하게.",
    ctaLabel: "쿨링 의류 보러가기",
    ctaUrl: "#cool-wear",
    imageEmoji: "👕",
    priority: 6,
  },
  {
    id: "heat-tech",
    trigger: "cold",
    badge: "🧊 한파",
    title: "오늘 최저기온 영하권!",
    description: "발열 내의 + 패딩 묶음 특가. 체온을 지켜줄 겨울 필수템 모아봤어요.",
    ctaLabel: "방한 의류 보러가기",
    ctaUrl: "#heat-tech",
    imageEmoji: "🧥",
    priority: 6,
  },
];

function getActiveTriggers(weather: WeatherData): PromotionTrigger[] {
  const triggers: PromotionTrigger[] = [];

  const hasRain = weather.hourlyForecasts.some(
    (f) => f.precipitation === "비" || f.precipitation === "소나기"
  );
  if (hasRain) triggers.push("rain");

  if (weather.maxTemp - weather.minTemp >= 10) triggers.push("temp_drop_sharp");
  if (weather.uvIndex >= 8) triggers.push("uv_high");
  if (weather.dustLevel === "나쁨" || weather.dustLevel === "매우나쁨") triggers.push("dust_bad");
  if (weather.maxTemp >= 28) triggers.push("hot");
  if (weather.minTemp <= 0) triggers.push("cold");

  return triggers;
}

export function getPromotions(weather: WeatherData, maxCount = 2): PromotionCard[] {
  const activeTriggers = getActiveTriggers(weather);
  if (activeTriggers.length === 0) return [];

  return PROMOTION_CATALOG
    .filter((p) => activeTriggers.includes(p.trigger))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxCount);
}
