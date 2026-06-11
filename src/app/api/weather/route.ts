import { NextRequest, NextResponse } from "next/server";
import { getMockWeatherData } from "@/lib/weather-mock";
import { getOutfitRecommendation } from "@/lib/outfit-recommender";
import { generateAlerts } from "@/lib/weather-alerts";
import { getPromotions } from "@/lib/promotions";
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

  // BFF: 모든 가공 로직을 서버에서 처리, 클라이언트는 결과만 소비
  const weather = getMockWeatherData(lat, lng);
  const [outfit, alerts, promotions] = [
    getOutfitRecommendation(weather),
    generateAlerts(weather),
    getPromotions(weather, 2),
  ];

  const response: BFFWeatherResponse = {
    weather,
    outfit,
    alerts,
    promotions,
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
