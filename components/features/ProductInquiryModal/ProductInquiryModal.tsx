"use client";

import Image from "next/image";
import { useEffect, useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import { Modal } from "@/components/ui/Modal/Modal";
import type { Product } from "@/types/product";

type ProductInquiryModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const inputErrorClassName = "border-error hover:border-error";

export function ProductInquiryModal({
  product,
  isOpen,
  onClose,
}: ProductInquiryModalProps) {
  const t = useTranslations("products");
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const formStatusId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  }, [isOpen]);

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!name.trim()) {
      next.name = t("inquiry_required");
    }

    if (!email.trim()) {
      next.email = t("inquiry_required");
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = t("inquiry_invalid_email");
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      // No backend yet — simulate a successful submit for UI feedback.
      // product.title / product.id will be used when email integration lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });

      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("inquiry_title")}
      closeLabel={t("close")}
      className="max-w-lg"
    >
      <p className="mb-6 font-sans text-sm leading-relaxed text-secondary">
        {t("inquiry_description", { product: product.title })}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        noValidate
        aria-describedby={
          status === "success" || status === "error" ? formStatusId : undefined
        }
      >
        <div>
          <label
            htmlFor={nameId}
            className="mb-2 block font-sans text-sm font-medium text-foreground"
          >
            {t("inquiry_name_label")}
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) {
                setErrors((current) => ({ ...current, name: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={`${inputClassName} ${errors.name ? inputErrorClassName : ""}`}
            disabled={status === "submitting"}
          />
          {errors.name ? (
            <p
              id={`${nameId}-error`}
              className="mt-1.5 font-sans text-xs text-error"
              role="alert"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="mb-2 block font-sans text-sm font-medium text-foreground"
          >
            {t("inquiry_email_label")}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) {
                setErrors((current) => ({ ...current, email: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={`${inputClassName} ${errors.email ? inputErrorClassName : ""}`}
            disabled={status === "submitting"}
          />
          {errors.email ? (
            <p
              id={`${emailId}-error`}
              className="mt-1.5 font-sans text-xs text-error"
              role="alert"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={messageId}
            className="mb-2 block font-sans text-sm font-medium text-foreground"
          >
            {t("inquiry_message_label")}{" "}
            <span className="font-normal text-muted">
              ({t("inquiry_optional")})
            </span>
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${inputClassName} min-h-24 resize-y`}
            disabled={status === "submitting"}
          />
        </div>

        {status === "success" ? (
          <p
            id={formStatusId}
            className="rounded-lg bg-success/10 px-4 py-3 font-sans text-sm text-success"
            role="status"
          >
            {t("inquiry_success")}
          </p>
        ) : null}

        {status === "error" ? (
          <p
            id={formStatusId}
            className="rounded-lg bg-error/10 px-4 py-3 font-sans text-sm text-error"
            role="alert"
          >
            {t("inquiry_error")}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          startIcon={
            <Image
              src="/icons/send.png"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
          }
        >
          {status === "submitting" ? t("inquiry_submitting") : t("inquiry_submit")}
        </Button>
      </form>
    </Modal>
  );
}
