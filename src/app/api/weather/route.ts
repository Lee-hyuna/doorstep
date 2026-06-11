import { NextRequest, NextResponse } from "next/server";
import { getMockWeatherData } from "@/lib/weather-mock";
import { getOutfitRecommendation } from "@/lib/outfit-recommender";
import { BFFWeatherResponse } from "@/types/weather";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lng = parseFloat(searchParams.get("lng") ?? "");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: "위도(lat)와 경도(lng) 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  if (lat < 33 || lat > 39 || lng < 124 || lng > 132) {
    return NextResponse.json(
      { error: "지원하지 않는 지역입니다. 한국 내 좌표를 입력하세요." },
      { status: 400 }
    );
  }

  // BFF: 데이터 조회 + 가공 + 추천 로직을 서버에서 처리
  // 실제 기상청 API 연동 시 getMockWeatherData → fetchKMAWeather 로 교체
  const weather = getMockWeatherData(lat, lng);
  const outfit = getOutfitRecommendation(weather);

  const response: BFFWeatherResponse = {
    weather,
    outfit,
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    headers: {
      // 5분 캐시: 날씨 데이터는 자주 바뀌지 않음
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
