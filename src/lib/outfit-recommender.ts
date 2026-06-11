import {
  OutfitRecommendation,
  TempLevel,
  WeatherData,
} from "@/types/weather";

function getTempLevel(minTemp: number, maxTemp: number): TempLevel {
  const avg = (minTemp + maxTemp) / 2;
  if (avg <= -5) return "very_cold";
  if (avg <= 4) return "cold";
  if (avg <= 8) return "chilly";
  if (avg <= 11) return "cool";
  if (avg <= 16) return "mild";
  if (avg <= 19) return "warm";
  if (avg <= 27) return "hot";
  return "very_hot";
}

const OUTFIT_MAP: Record<TempLevel, Omit<OutfitRecommendation, "rainGear">> = {
  very_cold: {
    level: "very_cold",
    label: "영하의 혹한",
    description: `최저 기온이 영하권입니다. 체온 유지가 최우선입니다.`,
    items: [
      { category: "상의", suggestions: ["두꺼운 니트", "기모 맨투맨", "패딩 조끼"] },
      { category: "하의", suggestions: ["기모 바지", "두꺼운 청바지", "방한 레깅스"] },
      { category: "아우터", suggestions: ["롱패딩", "두꺼운 울코트", "헤비 다운 점퍼"] },
      { category: "신발", suggestions: ["방한 부츠", "어그 부츠", "두꺼운 양말 필수"] },
      { category: "액세서리", suggestions: ["목도리", "두꺼운 장갑", "귀마개 모자", "핫팩"] },
    ],
    tips: [
      "레이어링을 활용해 내복 → 중간층 → 아우터 3단계로 입으세요.",
      "목, 손목, 발목 등 열이 빠져나가는 부위를 꼼꼼히 막으세요.",
    ],
  },
  cold: {
    level: "cold",
    label: "매서운 추위",
    description: `기온이 매우 낮습니다. 두꺼운 방한복이 필요합니다.`,
    items: [
      { category: "상의", suggestions: ["두꺼운 니트", "기모 후드티", "플리스"] },
      { category: "하의", suggestions: ["기모 청바지", "두꺼운 면바지"] },
      { category: "아우터", suggestions: ["패딩 점퍼", "울코트", "롱패딩"] },
      { category: "신발", suggestions: ["부츠", "두꺼운 운동화"] },
      { category: "액세서리", suggestions: ["목도리", "장갑", "비니"] },
    ],
    tips: [
      "내복이나 히트텍을 기본으로 착용하세요.",
      "바람이 강한 날은 방풍 소재 아우터를 선택하세요.",
    ],
  },
  chilly: {
    level: "chilly",
    label: "쌀쌀한 날씨",
    description: `제법 쌀쌀합니다. 두꺼운 겉옷이 필요한 날씨입니다.`,
    items: [
      { category: "상의", suggestions: ["니트", "두꺼운 맨투맨", "긴팔 셔츠"] },
      { category: "하의", suggestions: ["청바지", "면 슬랙스"] },
      { category: "아우터", suggestions: ["자켓", "점퍼", "야상", "짧은 패딩"] },
      { category: "신발", suggestions: ["운동화", "앵클부츠", "로퍼"] },
      { category: "액세서리", suggestions: ["얇은 목도리", "카디건 레이어링"] },
    ],
    tips: [
      "일교차가 클 수 있으니 탈착 가능한 레이어링을 추천합니다.",
      "저녁에는 급격히 추워질 수 있어 아우터를 꼭 챙기세요.",
    ],
  },
  cool: {
    level: "cool",
    label: "서늘한 날씨",
    description: `약간 서늘한 날씨입니다. 가을/봄 느낌의 레이어링이 좋습니다.`,
    items: [
      { category: "상의", suggestions: ["얇은 니트", "맨투맨", "긴팔 티셔츠"] },
      { category: "하의", suggestions: ["청바지", "면바지", "슬랙스"] },
      { category: "아우터", suggestions: ["카디건", "가디건", "얇은 자켓"] },
      { category: "신발", suggestions: ["운동화", "로퍼", "스니커즈"] },
      { category: "액세서리", suggestions: ["얇은 스카프 (저녁용)"] },
    ],
    tips: [
      "낮에는 자켓을 벗어도 될 정도지만 아침저녁은 챙기세요.",
    ],
  },
  mild: {
    level: "mild",
    label: "선선한 날씨",
    description: `선선하고 쾌적한 날씨입니다. 가벼운 겉옷 하나면 충분합니다.`,
    items: [
      { category: "상의", suggestions: ["긴팔 티셔츠", "얇은 스웨터", "셔츠"] },
      { category: "하의", suggestions: ["청바지", "면바지", "치노"] },
      { category: "아우터", suggestions: ["얇은 가디건", "셔츠 자켓", "바람막이"] },
      { category: "신발", suggestions: ["스니커즈", "로퍼", "슬립온"] },
      { category: "액세서리", suggestions: [] },
    ],
    tips: [
      "낮에는 덥게 느껴질 수 있으니 탈착 쉬운 아우터를 선택하세요.",
    ],
  },
  warm: {
    level: "warm",
    label: "따뜻한 날씨",
    description: `따뜻한 날씨입니다. 반팔과 얇은 겉옷을 준비하세요.`,
    items: [
      { category: "상의", suggestions: ["반팔 티셔츠", "얇은 긴팔", "블라우스"] },
      { category: "하의", suggestions: ["청바지", "면바지", "치마"] },
      { category: "아우터", suggestions: ["얇은 가디건 (아침/저녁용)"] },
      { category: "신발", suggestions: ["스니커즈", "샌들", "로퍼"] },
      { category: "액세서리", suggestions: [] },
    ],
    tips: [
      "자외선이 강해지는 시기입니다. 선크림을 꼭 바르세요.",
      "아침저녁 기온 차를 대비해 얇은 가디건을 가방에 넣어두세요.",
    ],
  },
  hot: {
    level: "hot",
    label: "더운 날씨",
    description: `꽤 더운 날씨입니다. 시원하고 통기성 좋은 옷을 입으세요.`,
    items: [
      { category: "상의", suggestions: ["반팔 티셔츠", "민소매", "린넨 셔츠"] },
      { category: "하의", suggestions: ["반바지", "린넨 바지", "짧은 치마"] },
      { category: "아우터", suggestions: ["냉방 대비 얇은 가디건"] },
      { category: "신발", suggestions: ["샌들", "슬리퍼", "경량 스니커즈"] },
      { category: "액세서리", suggestions: ["선글라스", "모자"] },
    ],
    tips: [
      "면이나 린넨 등 통기성 좋은 소재를 선택하세요.",
      "실내 냉방이 강한 경우 가디건을 챙기세요.",
      "자외선 차단에 신경 쓰세요.",
    ],
  },
  very_hot: {
    level: "very_hot",
    label: "폭염",
    description: `매우 더운 날씨입니다. 더위를 이기는 시원한 옷차림이 필수입니다.`,
    items: [
      { category: "상의", suggestions: ["민소매", "얇은 반팔", "기능성 쿨 티셔츠"] },
      { category: "하의", suggestions: ["짧은 반바지", "린넨 숏 팬츠", "미니스커트"] },
      { category: "아우터", suggestions: ["냉방 필수 실내용 가디건"] },
      { category: "신발", suggestions: ["샌들", "슬리퍼", "아쿠아 슈즈"] },
      { category: "액세서리", suggestions: ["자외선 차단 선글라스", "챙 넓은 모자", "미스트 스프레이"] },
    ],
    tips: [
      "외출 시 자외선 차단제(SPF 50 이상)를 꼭 바르세요.",
      "수분 보충을 자주 하고 시원한 음료를 챙기세요.",
      "열사병 주의: 정오~오후 2시 야외 활동을 최소화하세요.",
    ],
  },
};

export function getOutfitRecommendation(weather: WeatherData): OutfitRecommendation {
  const level = getTempLevel(weather.minTemp, weather.maxTemp);
  const base = OUTFIT_MAP[level];
  const needsRainGear = weather.precipitation !== "없음";

  const tips = [...base.tips];
  if (needsRainGear) {
    const rainMsg =
      weather.precipitation === "눈" || weather.precipitation === "비/눈"
        ? "눈이 올 예정입니다. 방수 부츠와 우산을 챙기세요."
        : weather.precipitation === "소나기"
          ? "소나기 예보가 있습니다. 접이식 우산을 가방에 챙기세요."
          : "비 예보가 있습니다. 우산이나 우비를 꼭 챙기세요.";
    tips.push(rainMsg);
  }

  const description = `${base.description} (최저 ${weather.minTemp}°C / 최고 ${weather.maxTemp}°C)`;

  return { ...base, description, tips, rainGear: needsRainGear };
}
