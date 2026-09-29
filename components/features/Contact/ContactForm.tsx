"use client";

import { useId, useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { SURFACE_CARD } from "@/constants/layout";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const inputErrorClassName = "border-error hover:border-error";

export function ContactForm() {
  const t = useTranslations("contacts.form");
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const formStatusId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!name.trim()) {
      next.name = t("required");
    }

    if (!email.trim()) {
      next.email = t("required");
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = t("invalid_email");
    }

    if (!message.trim()) {
      next.message = t("required");
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
    <div className={`${SURFACE_CARD} flex h-full flex-col p-6 md:p-8`}>
      <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
      <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-secondary md:text-base">
        {t("description")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-1 flex-col gap-5"
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
            {t("name_label")}
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
            {t("email_label")}
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

        <div className="flex min-h-0 flex-1 flex-col">
          <label
            htmlFor={messageId}
            className="mb-2 block font-sans text-sm font-medium text-foreground"
          >
            {t("message_label")}
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={7}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (errors.message) {
                setErrors((current) => ({ ...current, message: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={`${inputClassName} min-h-[10rem] flex-1 resize-none ${errors.message ? inputErrorClassName : ""}`}
            disabled={status === "submitting"}
          />
          {errors.message ? (
            <p
              id={`${messageId}-error`}
              className="mt-1.5 font-sans text-xs text-error"
              role="alert"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        {status === "success" ? (
          <p
            id={formStatusId}
            className="rounded-lg bg-success/10 px-4 py-3 font-sans text-sm text-success"
            role="status"
          >
            {t("success")}
          </p>
        ) : null}

        {status === "error" ? (
          <p
            id={formStatusId}
            className="rounded-lg bg-error/10 px-4 py-3 font-sans text-sm text-error"
            role="alert"
          >
            {t("error")}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          className="w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
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
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
