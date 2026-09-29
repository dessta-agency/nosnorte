# SectionEyebrow

## Responsibility

Reusable section label with a short primary accent line and uppercase eyebrow text on the same row.

## When to use

Use above section titles when a labelled intro is needed (e.g. location blocks, feature sections). Keep copy short.

## Props

- `children`: eyebrow label text.
- `className`: optional extra classes on the outer row.

## Spacing

Includes bottom margin (`mb-2`) before the following title. Do not add extra `mt-*` on the title for this gap.

## Usage

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";

<SectionEyebrow>Onde estamos</SectionEyebrow>
<h2>Localização</h2>
```
