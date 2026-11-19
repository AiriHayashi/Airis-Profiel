
"use client";

import { useState } from "react";

function getAdData(ad) {
  const data = ad?.data || ad || {};

  return {
    id: ad?.id || data.id,
    title: ad?.title || data.title || "Advertisement",
    placement: ad?.placement || data.placement || "inline",
    creativeType: ad?.creative_type || data.creative_type,
    image: ad?.image || data.image,
    html: ad?.html || data.html,
    videoUrl: ad?.video_url || data.video_url,
    link: ad?.link || {
      url: data.link_url,
      target: data.link_target,
      rel: data.link_rel,
    },
    active: ad?.active ?? data.active ?? data.status === "active",
    deliveryStatus: ad?.delivery_status,
  };
}

function AdCreative({ ad }) {
  const linkUrl = ad.link?.url;

  const linkProps = {
    href: linkUrl,
    target: ad.link?.target === "_blank" ? "_blank" : "_self",
    rel: ad.link?.target === "_blank"
      ? "sponsored noopener noreferrer"
      : "sponsored",
  };

  return (
    <div className="w-full">
      {/* Image Advertisement */}
      {ad.creativeType === "image" && ad.image && (
        <div>
          {linkUrl ? (
            <a {...linkProps}>
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-auto block"
              />
            </a>
          ) : (
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-auto block"
            />
          )}
        </div>
      )}

      {/* HTML Advertisement */}
      {ad.creativeType === "html" && ad.html && (
        <iframe
          title={ad.title}
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  * { box-sizing: border-box; }
                  body {
                    margin: 0;
                    padding: 16px;
                    font-family: sans-serif;
                    overflow-wrap: anywhere;
                  }
                  img, video {
                    max-width: 100%;
                    height: auto;
                  }
                </style>
              </head>
              <body>${ad.html}</body>
            </html>
          `}
          sandbox=""
          className="w-full min-h-[180px] border-0 bg-white"
          loading="lazy"
        />
      )}

      {/* Video Advertisement */}
      {ad.creativeType === "video" && ad.videoUrl && (
        <video
          src={ad.videoUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-[420px] bg-black"
        />
      )}

      {/* External Link */}
      {linkUrl && (
        <div className="mt-3">
          <a
            {...linkProps}
            className="text-xs underline underline-offset-4 text-neutral-500 hover:text-neutral-900 transition"
          >
            広告を見る →
          </a>
        </div>
      )}
    </div>
  );
}

export default function AdBlock({ ad }) {
  const [open, setOpen] = useState(true);

  if (!ad) return null;

  const data = getAdData(ad);

  // 広告の配信状態を確認
  if (
    !data.active ||
    data.deliveryStatus === "inactive" ||
    data.deliveryStatus === "expired" ||
    data.deliveryStatus === "paused"
  ) {
    return null;
  }

  // Popup Advertisement
  if (data.placement === "popup") {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-5">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.title}
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white shadow-2xl"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="広告を閉じる"
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-700 shadow"
          >
            ×
          </button>

          <div className="p-5 pt-12">
            <p className="mb-4 text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
              Advertisement
            </p>

            <AdCreative ad={data} />
          </div>
        </div>
      </div>
    );
  }

  // Normal / Inline Advertisement
  return (
    <aside className="my-12 border border-neutral-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
          Sponsored
        </span>

        <span className="text-[9px] text-neutral-300">
          Advertisement
        </span>
      </div>

      <AdCreative ad={data} />
    </aside>
  );
}
