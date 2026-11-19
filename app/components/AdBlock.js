
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

// 広告データの正規化
function getAdData(ad) {
  const data = ad?.data || ad || {};

  return {
    id: ad?.id || data.id,
    title: data.title || ad?.title || "Advertisement",
    placement: data.placement || ad?.placement || "inline",
    creativeType: data.creative_type || ad?.creative_type,
    image: data.image || ad?.image,
    html: data.html || ad?.html,
    videoUrl: data.video_url || ad?.video_url,
    linkUrl: data.link_url || ad?.link_url,
    linkTarget: data.link_target || ad?.link_target,
    linkRel: data.link_rel || ad?.link_rel,
    active:
      data.status === "active" ||
      data.active === true ||
      ad?.active === true,
    startAt: data.start_at || ad?.start_at,
    endAt: data.end_at || ad?.end_at,
  };
}

// 配信期間チェック
function isAdAvailable(ad) {
  if (!ad.active) return false;

  const now = Date.now();

  if (ad.startAt) {
    const start = new Date(ad.startAt).getTime();
    if (Number.isFinite(start) && now < start) return false;
  }

  if (ad.endAt) {
    const end = new Date(ad.endAt).getTime();
    if (Number.isFinite(end) && now > end) return false;
  }

  return true;
}

// 安全なリンク
function getSafeLink(url) {
  if (!url || typeof url !== "string") return null;

  try {
    const parsed = new URL(url);

    if (!["https:", "http:"].includes(parsed.protocol)) {
      return null;
    }

    return parsed.href;
  } catch {
    return null;
  }
}

// HTML広告iframe
function HtmlAdFrame({
  html,
  title,
  onHeight,
  height,
  linkUrl,
  linkTarget,
  onNavigate,
}) {
  const iframeRef = useRef(null);

  const srcDoc = useMemo(() => {
    const safeLink = JSON.stringify(linkUrl || "")
      .replace(/</g, "\\u003c");

    const target = linkTarget === "_blank"
      ? "_blank"
      : "_self";

    return `
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
              overflow-x: hidden;
            }

            body {
              font-family: Arial, sans-serif;
            }

            img {
              max-width: 100%;
              height: auto;
            }

            #ad-root {
              width: 100%;
              overflow: hidden;
              cursor: pointer;
            }
          </style>
        </head>

        <body>
          <div id="ad-root">
            ${html}
          </div>

          <script>
            const root = document.getElementById("ad-root");
            const defaultLink = ${safeLink};
            const defaultTarget = ${JSON.stringify(target)};

            // 広告クリック処理
            root.addEventListener("click", function(event) {
              const anchor = event.target.closest("a");

              let destination = anchor
                ? anchor.href
                : defaultLink;

              if (!destination) return;

              let url;

              try {
                url = new URL(destination, document.baseURI);

                if (!["https:", "http:"].includes(url.protocol)) {
                  return;
                }
              } catch {
                return;
              }

              event.preventDefault();
              event.stopPropagation();

              const target = anchor
                ? (anchor.target || defaultTarget)
                : defaultTarget;

              if (target === "_blank") {
                // ユーザー操作中に直接新しいタブを開く
                window.open(
                  url.href,
                  "_blank",
                  "noopener,noreferrer"
                );
              } else {
                // 親ページを遷移させる
                window.parent.postMessage({
                  type: "AD_NAVIGATE",
                  url: url.href
                }, "*");
              }
            }, true);

            // 高さ通知
            function reportHeight() {
              if (!root) return;

              const h = Math.ceil(
                root.getBoundingClientRect().height
              );

              parent.postMessage({
                type: "AD_HEIGHT",
                height: h
              }, "*");
            }

            const observer = new ResizeObserver(reportHeight);
            observer.observe(root);

            window.addEventListener("load", reportHeight);
            window.addEventListener("resize", reportHeight);

            if (document.fonts) {
              document.fonts.ready.then(reportHeight);
            }

            setTimeout(reportHeight, 300);
            setTimeout(reportHeight, 1000);
            setTimeout(reportHeight, 2000);
          </script>
        </body>
      </html>
    `;
  }, [html, linkUrl, linkTarget]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      if (event.data?.type === "AD_HEIGHT") {
        const newHeight = Number(event.data.height);

        if (Number.isFinite(newHeight) && newHeight > 0) {
          onHeight(Math.min(Math.ceil(newHeight), 5000));
        }
      }

      if (event.data?.type === "AD_NAVIGATE") {
        const safeUrl = getSafeLink(event.data.url);

        if (safeUrl) {
          onNavigate(safeUrl);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onHeight, onNavigate]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      loading="eager"
      className="block w-full border-0"
      style={{ height: `${height}px` }}
    />
  );
}

// 広告コンテンツ
function AdCreative({ ad, onHeight, height, onNavigate }) {
  const safeUrl = getSafeLink(ad.linkUrl);

  const target = ad.linkTarget === "_blank"
    ? "_blank"
    : "_self";

  const rel = ad.linkRel || (
    target === "_blank"
      ? "sponsored noopener noreferrer"
      : "sponsored"
  );

  return (
    <div className="relative w-full min-w-0">

      {/* Image */}
      {ad.creativeType === "image" && ad.image && (
        <div>
          {safeUrl ? (
            <a
              href={safeUrl}
              target={target}
              rel={rel}
              className="block cursor-pointer"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="block h-auto w-full"
              />
            </a>
          ) : (
            <img
              src={ad.image}
              alt={ad.title}
              className="block h-auto w-full"
            />
          )}
        </div>
      )}

      {/* HTML */}
      {ad.creativeType === "html" && ad.html && (
        <HtmlAdFrame
          html={ad.html}
          title={ad.title}
          onHeight={onHeight}
          height={height}
          linkUrl={safeUrl}
          linkTarget={target}
          onNavigate={onNavigate}
        />
      )}

      {/* Video */}
      {ad.creativeType === "video" && ad.videoUrl && (
        <video
          src={ad.videoUrl}
          controls
          playsInline
          preload="metadata"
          className="block max-h-[500px] w-full bg-black"
        />
      )}

    </div>
  );
}

// Main Advertisement Component
export default function AdBlock({ ad, onClose }) {
  const data = useMemo(() => getAdData(ad), [ad]);

  const [open, setOpen] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const [height, setHeight] = useState(300);

  const isPopup = data.placement === "popup";

  // 3秒後に閉じられる
  useEffect(() => {
    if (!isPopup || !open) return;

    setCanClose(false);

    const timer = window.setTimeout(() => {
      setCanClose(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [isPopup, open, data.id]);

  // 高さ更新
  const updateHeight = useCallback((newHeight) => {
    setHeight((previous) =>
      previous === newHeight ? previous : newHeight
    );
  }, []);

  // 広告リンク遷移
  const navigateAd = useCallback((url) => {
    const safeUrl = getSafeLink(url);
    if (!safeUrl) return;

    if (data.linkTarget === "_blank") {
      window.open(safeUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(safeUrl);
    }
  }, [data.linkTarget]);

  // 閉じる
  const closeAd = () => {
    setOpen(false);
    onClose?.();
  };

  if (!isAdAvailable(data)) return null;

  // Popup
  if (isPopup) {
    if (!open) return null;

    return (
      <div
        className="
          fixed inset-0 z-[9999]
          flex items-center justify-center
          bg-black/65 p-3 sm:p-5
        "
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={data.title}
          className="
            relative flex w-full max-w-[560px]
            flex-col overflow-hidden bg-white shadow-2xl
          "
          style={{ maxHeight: "90dvh" }}
        >
          {/* Header */}
          <div
            className="
              flex h-11 shrink-0 items-center
              justify-between border-b border-neutral-100
              bg-white px-4
            "
          >
            <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase">
              Advertisement
            </span>

            <button
              type="button"
              disabled={!canClose}
              onClick={closeAd}
              aria-label="広告を閉じる"
              className={`
                flex h-8 w-8 items-center justify-center
                rounded-full text-xl transition
                ${
                  canClose
                    ? "text-neutral-700 hover:bg-neutral-100"
                    : "cursor-not-allowed text-neutral-200"
                }
              `}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="min-h-0 w-full overflow-y-auto overscroll-contain">
            <AdCreative
              ad={data}
              onHeight={updateHeight}
              height={height}
              onNavigate={navigateAd}
            />
          </div>

          {/* Close Timer */}
          {!canClose && (
            <div className="h-1 w-full shrink-0 bg-neutral-100">
              <div className="h-full w-full animate-pulse bg-neutral-800" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline Advertisement
  return (
    <aside className="relative my-12 w-full border border-neutral-200 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
          Sponsored
        </span>

        <span className="text-[9px] text-neutral-300">
          Advertisement
        </span>
      </div>

      <AdCreative
        ad={data}
        onHeight={updateHeight}
        height={height}
        onNavigate={navigateAd}
      />
    </aside>
  );
}

