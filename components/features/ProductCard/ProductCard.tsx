"use client";

import Image from "next/image";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { ProductInquiryModal } from "@/components/features/ProductInquiryModal/ProductInquiryModal";
import { ProductOptionsModal } from "@/components/features/ProductOptionsModal/ProductOptionsModal";
import {
  MEDIA_HOVER_CARD,
  MEDIA_HOVER_MEDIA,
  SURFACE_CARD,
} from "@/constants/layout";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const imageSrc = product.thumbnail || product.images[0] || "";
  const hasMoreOptions = Boolean(product.additionalOptions);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  function openInquiry() {
    setIsInquiryOpen(true);
  }

  function handleInquiryKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInquiry();
    }
  }

  function handleViewOptions(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOptionsOpen(true);
  }

  function handleRequestInfo() {
    setIsOptionsOpen(false);
    setIsInquiryOpen(true);
  }

  return (
    <>
      <article
        className={`flex h-full flex-col ${SURFACE_CARD} p-4 shadow-sm ${MEDIA_HOVER_CARD}`}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={openInquiry}
          onKeyDown={handleInquiryKeyDown}
          aria-label={t("inquiry_open_label", { product: product.title })}
          className="flex min-h-0 flex-1 cursor-pointer flex-col gap-3 text-left"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-light/30">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className={`object-cover ${MEDIA_HOVER_MEDIA}`}
              />
            ) : (
              <div className="flex h-full items-center justify-center font-sans text-sm text-muted">
                —
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2">
            {product.brand ? (
              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
                {product.brand}
              </p>
            ) : null}

            <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-tight text-foreground">
              {product.title}
            </h3>

            {product.reference ? (
              <p className="font-sans text-[0.65rem] text-muted">
                {t("reference")}: {product.reference}
              </p>
            ) : null}

            {hasMoreOptions ? (
              <div className="mt-1 flex w-full items-center gap-2.5 rounded-lg border border-border/70 bg-gray-light/50 px-3 py-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-5 w-5 shrink-0 text-muted"
                  aria-hidden
                >
                  <circle
                    cx="7.5"
                    cy="10"
                    r="4.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12.5"
                    cy="10"
                    r="4.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="min-w-0 flex-1 font-sans text-[0.7rem] leading-tight">
                  <span className="font-semibold text-foreground">
                    {t("more_options")}:
                  </span>{" "}
                  <span className="text-muted">{product.additionalOptions}</span>
                </span>
              </div>
            ) : null}

            {product.availabilityStatus === "on_order" ? (
              <div className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full bg-[#AD7225]/15 px-2.5 py-1">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#AD7225]"
                  aria-hidden
                />
                <span className="font-sans text-[0.65rem] font-semibold text-[#AD7225]">
                  {t("on_order")}
                </span>
              </div>
            ) : product.availabilityStatus === "in_stock" ? (
              <div className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full bg-success/15 px-2.5 py-1">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                  aria-hidden
                />
                <span className="font-sans text-[0.65rem] font-semibold text-success">
                  {t("in_stock")}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-auto flex flex-col gap-1 border-t border-border/40 pt-3">
            <p
              className={`font-sans font-bold text-foreground ${
                product.priceOnRequest ? "text-base" : "text-lg"
              }`}
            >
              {product.priceOnRequest
                ? t("price_on_request")
                : formatPrice(product.price)}
            </p>
            {product.priceOnRequest ? (
              <p className="font-sans text-[0.7rem] leading-snug text-muted">
                {t("request_quote")}
              </p>
            ) : null}
          </div>
        </div>

        {hasMoreOptions ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleViewOptions}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 font-sans text-[0.75rem] font-semibold tracking-wide text-foreground transition-all hover:border-muted hover:bg-gray-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>{t("view_options")}</span>
              <Image
                src="/icons/arrowright_black.png"
                alt=""
                width={12}
                height={12}
                className="shrink-0"
              />
            </button>
          </div>
        ) : null}
      </article>

      {hasMoreOptions ? (
        <ProductOptionsModal
          key={`options-${product.id}`}
          product={product}
          isOpen={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
          onRequestInfo={handleRequestInfo}
        />
      ) : null}

      <ProductInquiryModal
        key={`inquiry-${product.id}`}
        product={product}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  );
}
