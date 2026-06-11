"use client";

import { OutfitRecommendation } from "@/types/weather";

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

const CATEGORY_ICON: Record<string, string> = {
  상의: "👕",
  하의: "👖",
  아우터: "🧥",
  신발: "👟",
  액세서리: "🧣",
};

export function OutfitCard({ outfit }: Props) {
  const gradient = LEVEL_GRADIENT[outfit.level];
  const filledItems = outfit.items.filter((i) => i.suggestions.length > 0);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
        <p className="text-white/80 text-sm font-medium mb-1">오늘의 옷차림</p>
        <h3 className="text-2xl font-bold">{outfit.label}</h3>
        <p className="text-white/90 text-sm mt-2 leading-relaxed">
          {outfit.description}
        </p>
        {outfit.rainGear && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
            ☂️ 우산 필수
          </div>
        )}
      </div>

      {/* 옷차림 아이템 */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          추천 아이템
        </h4>
        <div className="space-y-3">
          {filledItems.map((item) => (
            <div key={item.category} className="flex items-start gap-3">
              <span className="text-xl w-8 shrink-0 text-center">
                {CATEGORY_ICON[item.category]}
              </span>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">
                  {item.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.suggestions.map((s) => (
                    <span
                      key={s}
                      className="bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 팁 */}
        {outfit.tips.length > 0 && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              오늘의 팁
            </h4>
            <ul className="space-y-2">
              {outfit.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-yellow-400 shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
