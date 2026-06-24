"use client";

import type { Content } from "@prismicio/client";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import gsap from "gsap";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { SITE_URL } from "@/lib/site";

type HeaderBodyProps = {
  field: Content.HeaderSliceDefaultPrimary["header_body"];
};

type PreviewPosition = {
  left: number;
  top: number;
  transformOrigin: string;
};

const PREVIEW_WIDTH = 420;
const PREVIEW_HEIGHT = 260;
const PREVIEW_GAP = 20;

const getPreviewPosition = (targetRect: DOMRect): PreviewPosition => {
  const viewportWidth = globalThis.innerWidth;
  const viewportHeight = globalThis.innerHeight;
  const rightSpace = viewportWidth - targetRect.right;
  const leftSpace = targetRect.left;
  const bottomSpace = viewportHeight - targetRect.bottom;

  const centeredTop = Math.min(
    Math.max(16, targetRect.top + targetRect.height / 2 - PREVIEW_HEIGHT / 2),
    viewportHeight - PREVIEW_HEIGHT - 16,
  );

  if (rightSpace >= PREVIEW_WIDTH + PREVIEW_GAP) {
    return {
      left: targetRect.right + PREVIEW_GAP,
      top: centeredTop,
      transformOrigin: "left center",
    };
  }

  if (leftSpace >= PREVIEW_WIDTH + PREVIEW_GAP) {
    return {
      left: targetRect.left - PREVIEW_WIDTH - PREVIEW_GAP,
      top: centeredTop,
      transformOrigin: "right center",
    };
  }

  if (bottomSpace >= PREVIEW_HEIGHT + PREVIEW_GAP) {
    return {
      left: Math.min(
        Math.max(16, targetRect.left),
        viewportWidth - PREVIEW_WIDTH - 16,
      ),
      top: targetRect.bottom + PREVIEW_GAP,
      transformOrigin: "top center",
    };
  }

  return {
    left: Math.min(
      Math.max(16, targetRect.left),
      viewportWidth - PREVIEW_WIDTH - 16,
    ),
    top: Math.max(16, targetRect.top - PREVIEW_HEIGHT - PREVIEW_GAP),
    transformOrigin: "bottom center",
  };
};

export default function HeaderBody({ field }: HeaderBodyProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [position, setPosition] = useState<PreviewPosition>({
    left: 0,
    top: 0,
    transformOrigin: "left center",
  });

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const syncCapability = () => setCanHoverPreview(mediaQuery.matches);
    syncCapability();

    mediaQuery.addEventListener("change", syncCapability);
    return () => mediaQuery.removeEventListener("change", syncCapability);
  }, []);

  const handlePreviewEnter = useEffectEvent((event: Event) => {
    showPreview(event.currentTarget as HTMLElement);
  });

  const handlePreviewLeave = useEffectEvent(() => {
    hidePreview();
  });

  useEffect(() => {
    const container = contentRef.current;
    if (!container || !canHoverPreview) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>("blockquote, pre"),
    );

    for (const node of nodes) {
      node.addEventListener("mouseenter", handlePreviewEnter);
      node.addEventListener("mouseleave", handlePreviewLeave);
    }

    return () => {
      for (const node of nodes) {
        node.removeEventListener("mouseenter", handlePreviewEnter);
        node.removeEventListener("mouseleave", handlePreviewLeave);
      }
    };
  }, [canHoverPreview]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    if (!isPreviewVisible) {
      gsap.killTweensOf(preview);
      gsap.to(preview, {
        opacity: 0,
        scale: 0.94,
        y: 8,
        duration: 0.16,
        ease: "power2.in",
      });
      return;
    }

    gsap.killTweensOf(preview);
    gsap.fromTo(
      preview,
      { opacity: 0, scale: 0.9, y: 10, rotateX: -4 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.32,
        ease: "power3.out",
      },
    );
  }, [isPreviewVisible]);

  const showPreview = (element: HTMLElement) => {
    if (!canHoverPreview) return;
    setPosition(getPreviewPosition(element.getBoundingClientRect()));
    setIsPreviewVisible(true);
  };

  const hidePreview = () => {
    setIsPreviewVisible(false);
  };

  const components: JSXMapSerializer = {
    paragraph: ({ children }) => (
      <p className="max-w-[150ch] text-balance wrap-break-word-break-words leading-7 text-shark-700 dark:text-shark-300">
        {children}
      </p>
    ),
    hyperlink: ({ node, children }) => (
      <a
        href={node.data.url ?? "#"}
        className=" break-all font-medium text-viridian-700 underline underline-offset-4 hover:text-viridian-600 dark:text-viridian-300 dark:hover:text-viridian-200"
      >
        {children}
      </a>
    ),
    preformatted: ({ node }) => (
      <pre
        className="max-w-full cursor-default overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-shark-700 dark:text-shark-200"
        onMouseEnter={(event) => showPreview(event.currentTarget)}
        onMouseLeave={hidePreview}
      >
        {node.text}
      </pre>
    ),
  };

  return (
    <>
      <div
        ref={contentRef}
        className="w-full min-w-0 space-y-4 [&_blockquote]:max-w-full [&_blockquote]:overflow-x-auto [&_blockquote]:whitespace-pre-wrap [&_blockquote]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
      >
        <PrismicRichText field={field} components={components} />
      </div>

      {canHoverPreview && (
        <div
          ref={previewRef}
          className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-2xl border border-viridian-500/20 bg-neutral-950/95 shadow-2xl shadow-black/35 backdrop-blur-md lg:block"
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            left: position.left,
            top: position.top,
            transformOrigin: position.transformOrigin,
            opacity: 0,
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] font-mono text-neutral-300">
            <span>Live preview</span>
            <span>{SITE_URL}</span>
          </div>
          <div className="relative h-[calc(100%-37px)] overflow-hidden bg-neutral-900">
            <iframe
              src={SITE_URL}
              title="Live site preview"
              className="pointer-events-none h-[780px] w-[1280px] origin-top-left scale-[0.328] border-0"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
