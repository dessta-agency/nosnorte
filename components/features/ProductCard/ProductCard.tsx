"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductOptionsModal } from "@/components/features/ProductOptionsModal/ProductOptionsModal";
import { SURFACE_CARD } from "@/constants/layout";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const ADDED_FEEDBACK_MS = 2400;

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

type AddToOrderButtonProps = {
  isAdded: boolean;
  onClick: () => void;
  addLabel: string;
  addedLabel: string;
  size?: "card" | "modal";
};

function AddToOrderButton({
  isAdded,
  onClick,
  addLabel,
  addedLabel,
  size = "card",
}: AddToOrderButtonProps) {
  const isCard = size === "card";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAdded}
      aria-live="polite"
      className={`relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg px-3 py-2.5 font-sans font-semibold tracking-wide text-white shadow-sm transition-[background-color,box-shadow,transform] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default ${
        isCard ? "text-[0.75rem]" : "text-sm"
      } ${
        isAdded
          ? "bg-success shadow-md"
          : "bg-primary hover:bg-primary-hover hover:shadow-md"
      }`}
    >
      <span className="grid place-items-center">
        <span
          className={`col-start-1 row-start-1 flex items-center gap-2 transition-all duration-500 ease-out ${
            isAdded
              ? "pointer-events-none translate-y-1 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <Image
            src="/icons/shop.png"
            alt=""
            width={isCard ? 18 : 16}
            height={isCard ? 18 : 16}
            className="shrink-0 brightness-0 invert"
          />
          <span>{addLabel}</span>
        </span>
        <span
          className={`col-start-1 row-start-1 flex items-center gap-2 transition-all duration-500 ease-out ${
            isAdded
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            className={`shrink-0 ${isCard ? "h-[18px] w-[18px]" : "h-4 w-4"}`}
            aria-hidden
          >
            <path
              d="M4.5 10.5L8 14l7.5-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{addedLabel}</span>
        </span>
      </span>
    </button>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const imageSrc = product.thumbnail || product.images[0] || "";
  const hasMoreOptions = Boolean(product.additionalOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
    };
  }, []);

  function handleAddToOrder() {
    setIsAdded(true);
    if (addedTimeoutRef.current) {
      clearTimeout(addedTimeoutRef.current);
    }
    addedTimeoutRef.current = setTimeout(() => {
      setIsAdded(false);
      addedTimeoutRef.current = null;
    }, ADDED_FEEDBACK_MS);
  }

  return (
    <>
      <article className={`group flex h-full flex-col ${SURFACE_CARD} p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)]`}>
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-light/30">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-sm text-muted">
              —
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
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

          <div className="mt-auto flex flex-col gap-3 border-t border-border/40 pt-3">
            <div className="flex flex-col gap-1">
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

            <div className="flex flex-col gap-2">
              {hasMoreOptions ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
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
              ) : (
                <AddToOrderButton
                  isAdded={isAdded}
                  onClick={handleAddToOrder}
                  addLabel={t("add_to_order")}
                  addedLabel={t("added_to_order")}
                />
              )}
            </div>
          </div>
        </div>
      </article>

      {hasMoreOptions && isModalOpen ? (
        <ProductOptionsModal
          key={product.id}
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToOrder={handleAddToOrder}
          isAdded={isAdded}
        />
      ) : null}
    </>
  );
}
