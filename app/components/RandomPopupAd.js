
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import AdBlock from "@/app/components/AdBlock";

// true: 毎回表示
// false: 約3分の1の確率で表示
const ALWAYS_SHOW_POPUP = false;

// CMS広告データを正規化

function normalizeAd(ad) {
  const data = ad?.data || ad || {};

  return {
    id: ad?.id || data.id,
    title: data.title || ad?.title || "Advertisement",

    placement: data.placement,
    creative_type: data.creative_type,

    image: data.image,
    html: data.html,
    video_url: data.video_url,

    link_url: data.link_url,
    link_target: data.link_target,
    link_rel: data.link_rel,

    priority: Number(data.priority || 0),

    // CMSの公開状態と広告配信状態を分離
    record_status:
      ad?.record_status ??
      (ad?.data ? ad.status : undefined),

    status: data.status,

    start_at: data.start_at,
    end_at: data.end_at,
  };
}


// 配信期間の確認
function isAvailable(ad) {
  if (ad.status !== "active") return false;

  if (
    ad.record_status &&
    ad.record_status !== "published"
  ) {
    return false;
  }

  const now = Date.now();

  if (ad.start_at) {
    const start = new Date(ad.start_at).getTime();

    if (Number.isFinite(start) && now < start) {
      return false;
    }
  }

  if (ad.end_at) {
    const end = new Date(ad.end_at).getTime();

    if (Number.isFinite(end) && now > end) {
      return false;
    }
  }

  return true;
}

// 広告選択
function selectRandomAd(ads) {
  if (ads.length === 0) return null;

  // 優先度が最高の広告群を取得
  const highestPriority = Math.max(
    ...ads.map((ad) => ad.priority)
  );

  const priorityAds = ads.filter(
    (ad) => ad.priority === highestPriority
  );

  // 同じ優先度ならランダム選択
  const index = Math.floor(
    Math.random() * priorityAds.length
  );

  return priorityAds[index];
}

export default function RandomPopupAd({ ads = [] }) {
  const pathname = usePathname();

  const [selectedAd, setSelectedAd] = useState(null);
  const [visible, setVisible] = useState(false);

  // 配信可能な広告
  const eligibleAds = useMemo(() => {
    return ads
      .map(normalizeAd)
      .filter((ad) => {
        return (
          ad.id &&
          ad.placement === "popup" &&
          isAvailable(ad)
        );
      });
  }, [ads]);

  useEffect(() => {
    setSelectedAd(null);
    setVisible(false);

    if (eligibleAds.length === 0) return;

    // 表示確率
    if (
      !ALWAYS_SHOW_POPUP &&
      Math.random() >= 1 / 3
    ) {
      return;
    }

    const ad = selectRandomAd(eligibleAds);

    if (!ad) return;

    setSelectedAd(ad);

    // ページ読み込み後に表示
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => window.clearTimeout(timer);

  }, [pathname, eligibleAds]);

  if (!selectedAd || !visible) return null;

  return (
    <AdBlock
      key={`${pathname}-${selectedAd.id}`}
      ad={selectedAd}
      onClose={() => setVisible(false)}
    />
  );
}
