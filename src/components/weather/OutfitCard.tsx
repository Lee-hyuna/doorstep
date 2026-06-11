"use client";

import Image from "next/image";
import { useState } from "react";
import { OutfitItem, OutfitRecommendation } from "@/types/weather";

interface Props {
  outfit: OutfitRecommendation;
}

const LEVEL_GRADIENT: Record<string, string> = {
  very_cold: "from-blue-900 to-blue-700",
  cold: "from-blue-700 to-blue-500",
  chilly: "from-blue-500 to-cyan-400",
  cool: "from-cyan-400 to-teal-400",
  mild: "from-teal-400 to-green-400",
  warm: "from-green-400 to-yellow-400",
  hot: "from-yellow-400 to-orange-400",
  very_hot: "from-orange-500 to-red-500",
};

const CATEGORY_FALLBACK: Record<string, string> = {
  상의: "👕",
  아우터: "🧥",
};

function OutfitImageCard({ item }: { item: OutfitItem }) {
  const [imgError, setImgError] = useState(false);
  const fallback = CATEGORY_FALLBACK[item.category] ?? "👗";
  const label = item.suggestions[0] ?? item.category;

  return (
    <div className="flex-1 flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">
        {item.category}
      </p>

      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
        {item.imageUrl && !imgError ? (
          <Image
            src={item.imageUrl}
            alt={label}
            fill
            sizes="(max-width: 640px) 45vw, 200px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {fallback}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {item.suggestions.length > 1 && (
          <p className="text-xs text-gray-400 mt-0.5">
            또는 {item.suggestions.slice(1, 3).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export function OutfitCard({ outfit }: Props) {
  const gradient = LEVEL_GRADIENT[outfit.level];
  const topItem = outfit.items.find((i) => i.category === "상의");
  const outerItem = outfit.items.find((i) => i.category === "아우터");
  const visibleItems = [topItem, outerItem].filter(Boolean) as OutfitItem[];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${gradient} px-6 py-5 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium mb-0.5">내일의 옷차림</p>
            <h3 className="text-xl font-bold">{outfit.label}</h3>
          </div>
          {outfit.rainGear && (
            <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
              ☂️ 우산 필수
            </span>
          )}
        </div>
        <p className="text-white/80 text-xs mt-2 leading-snug">{outfit.description}</p>
      </div>

      {/* 상의 / 아우터 이미지 카드 */}
      <div className="p-5">
        {visibleItems.length > 0 ? (
          <div className="flex gap-4">
            {visibleItems.map((item) => (
              <OutfitImageCard key={item.category} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">추천 아이템 없음</p>
        )}

        {/* 팁 */}
        {outfit.tips.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
            {outfit.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-yellow-400 shrink-0 mt-0.5">💡</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
