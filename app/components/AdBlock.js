
"use client";

import { useEffect, useState, useCallback } from "react";

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

/**
 * HTML広告専用 iframe
 * Tailwind CSSを独立して読み込む
 */
function HtmlAdvertisement({ html, title, popup = false, onHeight }) {
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <script src="https://cdn.tailwindcss.com"></script>

        <style>
          * {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow: hidden;
          }

          body {
            font-family: Arial, sans-serif;
          }

          img, video {
            max-width: 100%;
          }

          img {
            height: auto;
          }

          #ad-root {
            width: 100%;
            overflow: hidden;
          }
        </style>
      </head>

      <body>
        <div id="ad-root">
          ${html}
        </div>

        <script>
          function reportHeight() {
            const root = document.getElementById("ad-root");

            if (!root) return;

            const height = Math.ceil(
              Math.max(
                root.scrollHeight,
                root.getBoundingClientRect().height
              )
            );

            parent.postMessage({
              type: "AD_HEIGHT",
              height
            }, "*");
          }

          window.addEventListener("load", reportHeight);

          window.addEventListener("resize", reportHeight);

          if (document.fonts) {
            document.fonts.ready.then(reportHeight);
          }

          const observer = new ResizeObserver(reportHeight);

          observer.observe(document.documentElement);

          observer.observe(document.body);

          window.addEventListener("message", (event) => {
            if (event.data?.type === "AD_REFRESH") {
              reportHeight();
            }
          });

          setTimeout(reportHeight, 500);
          setTimeout(reportHeight, 1500);
        </script>
      </body>
    </html>
  `;

  return (
    <iframe
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      onLoad={(event) => {
        event.currentTarget.contentWindow?.postMessage(
          { type: "AD_REFRESH" },
          "*"
        );
      }}
      className="block w-full border-0"
      style={{
        height: popup ? "auto" : "auto",
        minHeight: popup ? 200 : 180,
      }}
      ref={(element) => {
        if (!element) return;

        element.dataset.adFrame = "true";
      }}
    />
  );
}

/**
 * 広告クリエイティブ
 */
function AdCreative({ ad, popup = false }) {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    if (ad.creativeType !== "html") return;

    const handleMessage = (event) => {
      if (
        event.data?.type === "AD_HEIGHT" &&
        Number.isFinite(event.data.height) &&
        event.data.height > 0
      ) {
        setHeight(Math.min(event.data.height, 5000));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [ad.creativeType]);

  const linkUrl = ad.link?.url;

  const linkProps = {
    href: linkUrl,
    target: ad.link?.target === "_blank" ? "_blank" : "_self",
    rel: "sponsored noopener noreferrer",
  };

  return (
    <div className="w-full min-w-0">

      {ad.creativeType === "image" && ad.image && (
        <div>
          {linkUrl ? (
            <a {...linkProps}>
              <img
                src={ad.image}
                alt={ad.title}
                className="block w-full h-auto"
              />
            </a>
          ) : (
            <img
              src={ad.image}
              alt={ad.title}
              className="block w-full h-auto"
            />
          )}
        </div>
      )}

      {ad.creativeType === "html" && ad.html && (
        <iframe
          title={ad.title}
          srcDoc={`
            <!DOCTYPE html>
            <html lang="ja">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  * { box-sizing: border-box; }
                  html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    overflow: hidden;
                  }
                  body { font-family: Arial, sans-serif; }
                  img, video { max-width: 100%; height: auto; }
                  #ad-root { width: 100%; }
                </style>
              </head>
              <body>
                <div id="ad-root">${ad.html}</div>
                <script>
                  function report() {
                    const root = document.getElementById("ad-root");
                    if (!root) return;

                    parent.postMessage({
                      type: "AD_HEIGHT",
                      height: Math.ceil(root.getBoundingClientRect().height)
                    }, "*");
                  }

                  new ResizeObserver(report).observe(
                    document.getElementById("ad-root")
                  );

                  window.addEventListener("load", report);
                  setTimeout(report, 500);
                  setTimeout(report, 1500);
                </script>
              </body>
            </html>
          `}
          sandbox="allow-scripts allow-same-origin"
          className="block w-full border-0"
          style={{ height: `${height}px` }}
          loading="eager"
        />
      )}

      {ad.creativeType === "video" && ad.videoUrl && (
        <video
          src={ad.videoUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-[420px] bg-black"
        />
      )}

      {linkUrl && ad.creativeType !== "image" && (
        <div className="mt-3">
          <a
            {...linkProps}
            className="text-xs underline underline-offset-4 text-neutral-500 hover:text-neutral-900"
          >
            広告を見る →
          </a>
        </div>
      )}

    </div>
  );
}

/**
 * 広告ブロック
 */
export default function AdBlock({ ad }) {
  const [open, setOpen] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const [height, setHeight] = useState(300);
  const [scale, setScale] = useState(1);

  const data = getAdData(ad);

  useEffect(() => {
    if (data.placement !== "popup" || !open) return;

    setCanClose(false);

    const timer = setTimeout(() => {
      setCanClose(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [data.placement, open, data.id]);

  const updateScale = useCallback(() => {
    if (typeof window === "undefined") return;

    const availableHeight = window.innerHeight * 0.78;

    setScale(
      Math.min(1, availableHeight / Math.max(height, 1))
    );
  }, [height]);

  useEffect(() => {
    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [updateScale]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.type === "AD_HEIGHT" &&
        Number.isFinite(event.data.height) &&
        event.data.height > 0
      ) {
        setHeight(Math.min(event.data.height, 5000));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!data.active) return null;

  if (
    ["inactive", "expired", "paused"].includes(
      data.deliveryStatus
    )
  ) {
    return null;
  }

  if (data.placement === "popup") {
    if (!open) return null;

    const scaledHeight = height * scale;

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-5">

        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.title}
          className="relative w-full max-w-[560px] overflow-hidden bg-white shadow-2xl"
          style={{
            height: `${scaledHeight + 64}px`,
            maxHeight: "90dvh",
          }}
        >

          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
            <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
              Advertisement
            </span>

            <button
              type="button"
              onClick={() => {
                if (canClose) setOpen(false);
              }}
              disabled={!canClose}
              aria-label="広告を閉じる"
              className={`h-7 w-7 text-xl transition ${
                canClose
                  ? "text-neutral-500 hover:text-black cursor-pointer"
                  : "text-neutral-200 cursor-not-allowed"
              }`}
            >
              ×
            </button>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              height: `${scaledHeight}px`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${height}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              <div className="w-full">
                {data.creativeType === "image" && data.image && (
                  <AdCreative ad={data} popup />
                )}

                {data.creativeType === "html" && data.html && (
                  <iframe
                    title={data.title}
                    srcDoc={`
                      <!DOCTYPE html>
                      <html lang="ja">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <script src="https://cdn.tailwindcss.com"></script>
                          <style>
                            * { box-sizing: border-box; }
                            html, body {
                              margin: 0;
                              padding: 0;
                              width: 100%;
                              overflow: hidden;
                            }
                            body { font-family: Arial, sans-serif; }
                            img, video { max-width: 100%; height: auto; }
                            #ad-root { width: 100%; }
                          </style>
                        </head>
                        <body>
                          <div id="ad-root">${data.html}</div>
                          <script>
                            function report() {
                              const root = document.getElementById("ad-root");
                              if (!root) return;

                              parent.postMessage({
                                type: "AD_HEIGHT",
                                height: Math.ceil(root.getBoundingClientRect().height)
                              }, "*");
                            }

                            new ResizeObserver(report).observe(
                              document.getElementById("ad-root")
                            );

                            window.addEventListener("load", report);
                            setTimeout(report, 500);
                            setTimeout(report, 1500);
                          </script>
                        </body>
                      </html>
                    `}
                    sandbox="allow-scripts allow-same-origin"
                    className="block w-full border-0"
                    style={{ height: `${height}px` }}
                  />
                )}

                {data.creativeType === "video" && (
                  <AdCreative ad={data} popup />
                )}
              </div>
            </div>
          </div>

          {!canClose && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-100">
              <div className="h-full bg-neutral-800 animate-pulse w-full" />
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <aside className="my-12 w-full border border-neutral-200 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
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
