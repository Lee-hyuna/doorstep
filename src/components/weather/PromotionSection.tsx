"use client";

import { PromotionCard } from "@/types/weather";

interface Props {
  promotions: PromotionCard[];
}

export function PromotionSection({ promotions }: Props) {
  if (promotions.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
        오늘 날씨에 필요한 것들
      </p>
      {promotions.map((promo) => (
        <a
          key={promo.id}
          href={promo.ctaUrl}
          className="block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="flex items-center gap-4 p-4">
            <div className="text-4xl w-14 h-14 flex items-center justify-center bg-gray-50 rounded-xl shrink-0">
              {promo.imageEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5 mb-1">
                {promo.badge}
              </span>
              <p className="text-sm font-semibold text-gray-800 leading-snug truncate">
                {promo.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                {promo.description}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-1.5 whitespace-nowrap">
                {promo.ctaLabel}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
