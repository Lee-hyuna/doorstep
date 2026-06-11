"use client";

import { useEffect, useState } from "react";
import { BFFWeatherResponse } from "@/types/weather";
import { WeatherCard } from "./WeatherCard";
import { OutfitCard } from "./OutfitCard";
import { AlertBanner } from "./AlertBanner";
import { PromotionSection } from "./PromotionSection";

type Status = "idle" | "locating" | "loading" | "success" | "error";

export function WeatherDashboard() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<BFFWeatherResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchWeather = () => {
    setStatus("locating");
    setErrorMsg("");

    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setStatus("loading");
        try {
          const res = await fetch(
            `/api/weather?lat=${coords.latitude}&lng=${coords.longitude}`
          );
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error ?? "날씨 정보를 불러오는 데 실패했습니다.");
          }
          const json: BFFWeatherResponse = await res.json();
          setData(json);
          setStatus("success");
        } catch (e) {
          setStatus("error");
          setErrorMsg(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
        }
      },
      (err) => {
        setStatus("error");
        if (err.code === 1) {
          setErrorMsg("위치 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해 주세요.");
        } else {
          setErrorMsg("위치 정보를 가져올 수 없습니다. 다시 시도해 주세요.");
        }
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            내일 뭐 입지? 👕
          </h1>
          <p className="text-gray-500 text-sm">
            내일 날씨 미리 보고, 옷 준비해요
          </p>
        </div>

        {/* 로딩 상태 */}
        {(status === "idle" || status === "locating") && (
          <StatusView
            icon="📍"
            title="위치를 확인하는 중..."
            subtitle="현재 위치 기반으로 날씨를 불러옵니다."
            loading
          />
        )}

        {status === "loading" && (
          <StatusView
            icon="⛅"
            title="날씨 정보를 불러오는 중..."
            subtitle="잠시만 기다려 주세요."
            loading
          />
        )}

        {status === "error" && (
          <StatusView
            icon="😅"
            title="오류가 발생했습니다"
            subtitle={errorMsg}
            action={
              <button
                onClick={fetchWeather}
                className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
              >
                다시 시도
              </button>
            }
          />
        )}

        {status === "success" && data && (
          <div className="space-y-4">
            {/* 날씨 카드 */}
            <WeatherCard weather={data.weather} />

            {/* 오늘의 날씨 알림 */}
            <AlertBanner alerts={data.alerts} />

            {/* 옷차림 추천 */}
            <OutfitCard outfit={data.outfit} />

            {/* 수익성 제휴 프로모션 (날씨 조건 매칭, 최대 2개) */}
            <PromotionSection promotions={data.promotions} />

            {/* 새로고침 */}
            <div className="text-center pb-4">
              <button
                onClick={fetchWeather}
                className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
              >
                새로고침
              </button>
              <p className="text-gray-300 text-xs mt-1">
                마지막 업데이트:{" "}
                {new Date(data.fetchedAt).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusView({
  icon,
  title,
  subtitle,
  loading,
  action,
}: {
  icon: string;
  title: string;
  subtitle: string;
  loading?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg text-center border border-white/50">
      <div className={`text-5xl mb-4 ${loading ? "animate-pulse" : ""}`}>
        {icon}
      </div>
      <p className="text-gray-700 font-semibold mb-1">{title}</p>
      <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
        {subtitle}
      </p>
      {action}
    </div>
  );
}
