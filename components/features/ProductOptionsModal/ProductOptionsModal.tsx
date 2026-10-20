"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal/Modal";
import type { Product } from "@/types/product";

type ProductOptionsModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onRequestInfo?: () => void;
};

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function ProductOptionsModal({
  product,
  isOpen,
  onClose,
  onRequestInfo,
}: ProductOptionsModalProps) {
  const t = useTranslations("products");
  const imageSrc = product.thumbnail || product.images[0] || "";
  const colorOptions = product.colorOptions ?? [];
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState(
    () => product.colorOptions?.[0]?.id ?? ""
  );
  const quantityId = useId();

  useEffect(() => {
    if (!isOpen) return;
    setQuantity(1);
    setSelectedColorId(product.colorOptions?.[0]?.id ?? "");
  }, [isOpen, product.colorOptions]);

  const selectedColor = colorOptions.find(
    (option) => option.id === selectedColorId
  );

  const infoRows = [
    product.sku ? { label: t("sku"), value: product.sku } : null,
    product.brand ? { label: t("brand"), value: product.brand } : null,
    product.unit ? { label: t("unit"), value: product.unit } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.title}
      closeLabel={t("close")}
      hideTitle
      className="max-h-[90vh] max-w-5xl overflow-y-auto p-5 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-light/40 lg:aspect-auto lg:min-h-80">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center font-sans text-sm text-muted">
              —
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-sans text-xl font-bold leading-snug text-foreground sm:text-2xl">
              {product.title}
            </h3>

            {product.reference ? (
              <p className="font-sans text-sm text-muted">
                {t("reference")}: {product.reference}
              </p>
            ) : null}

            {product.availabilityStatus === "on_order" ? (
              <div className="inline-flex items-center gap-1.5 self-start">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#AD7225]"
                  aria-hidden
                />
                <span className="font-sans text-sm font-semibold text-[#AD7225]">
                  {t("on_order")}
                </span>
              </div>
            ) : product.availabilityStatus === "in_stock" ? (
              <div className="inline-flex items-center gap-1.5 self-start">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                  aria-hidden
                />
                <span className="font-sans text-sm font-semibold text-success">
                  {t("in_stock")}
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <p
              className={`font-sans font-bold text-foreground ${
                product.priceOnRequest ? "text-xl" : "text-2xl"
              }`}
            >
              {product.priceOnRequest
                ? t("price_on_request")
                : formatPrice(product.price)}
            </p>
            {product.priceOnRequest ? (
              <p className="font-sans text-sm text-muted">{t("request_quote")}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor={quantityId}
              className="font-sans text-sm font-medium text-foreground"
            >
              {t("quantity", { unit: product.unit ?? t("unit_bag") })}:
            </label>
            <select
              id={quantityId}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="h-11 w-full max-w-40 cursor-pointer rounded-md border border-border bg-background px-3 font-sans text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {QUANTITY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {onRequestInfo ? (
            <button
              type="button"
              onClick={onRequestInfo}
              className="inline-flex cursor-pointer items-center self-start font-sans text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t("request_info")}
            </button>
          ) : null}

          {colorOptions.length > 0 ? (
            <div className="border-t border-border/70 pt-4">
              <p className="font-sans text-sm text-foreground">
                <span className="font-semibold">
                  {t("color_count", { count: colorOptions.length })}:
                </span>{" "}
                {selectedColor ? (
                  <span className="font-semibold">{selectedColor.label}</span>
                ) : null}
              </p>

              <div
                className="mt-3 flex flex-wrap gap-2"
                role="listbox"
                aria-label={t("color")}
              >
                {colorOptions.map((option) => {
                  const isSelected = option.id === selectedColorId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => setSelectedColorId(option.id)}
                      className={`min-w-24 cursor-pointer rounded-md border px-4 py-2.5 font-sans text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        isSelected
                          ? "border-foreground font-semibold text-foreground"
                          : "border-border text-muted hover:border-muted hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {infoRows.length > 0 ? (
        <section className="mt-10">
          <h4 className="font-sans text-lg font-bold text-foreground">
            {t("product_information")}
          </h4>
          <dl className="mt-3 flex flex-col gap-2">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[8rem_1fr] gap-4 font-sans text-sm sm:grid-cols-[10rem_1fr]"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </Modal>
  );
}
