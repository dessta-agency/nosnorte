export const COMPANY_CONTACT = {
  email: {
    address: "geral@nosnorte.com",
    mailto: "mailto:geral@nosnorte.com",
  },
  phone: {
    display: "252 910 110",
    tel: "tel:+351252910110",
  },
  whatsapp: {
    display: "917 973 830",
    url: "https://wa.me/351917973830",
  },
  address: {
    line1: "Rua de Feixe Nº 6",
    line2: "4705-630 Tebosa - Braga",
    mapsUrl:
      "https://www.google.com/maps/place/N%C3%B3s-Norte+-+Materiais+de+Constru%C3%A7%C3%A3o/@41.475936,-8.4846669,17z/data=!3m1!4b1!4m6!3m5!1s0xd24f877c0a3f573:0x50e4484ae3e5f4ed!8m2!3d41.475932!4d-8.482092!16s%2Fg%2F1tgtgsmm?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D",
  },
} as const;

export const BUSINESS_HOURS = {
  weekdays: {
    morning: { start: "9h00", end: "12h30" },
    afternoon: { start: "14h00", end: "19h00" },
  },
  saturday: {
    morning: { start: "9h00", end: "12h30" },
  },
  closedKeys: [
    "sundays",
    "national_holidays",
    "municipal_holiday",
    "religious_afternoon",
    "carnival",
    "easter",
    "summer_vacation",
  ],
} as const;

/** Google Maps iframe embed (place: Nós-Norte, Tebosa). */
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.5!2d-8.482092!3d41.475932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24f877c0a3f573%3A0x50e4484ae3e5f4ed!2sN%C3%B3s-Norte%20-%20Materiais%20de%20Constru%C3%A7%C3%A3o!5e0!3m2!1spt-PT!2spt!4v1710000000000!5m2!1spt-PT!2spt";

export const FOOTER_CONTACT_ITEMS = [
  {
    labelKey: "email",
    icon: "/icons/email.png",
    details: [
      {
        text: COMPANY_CONTACT.email.address,
        href: COMPANY_CONTACT.email.mailto,
      },
    ],
  },
  {
    labelKey: "phone",
    icon: "/icons/phone.png",
    details: [
      {
        text: COMPANY_CONTACT.phone.display,
        href: COMPANY_CONTACT.phone.tel,
      },
      {
        translationKey: "phone_note",
        muted: true,
      },
    ],
  },
  {
    labelKey: "whatsapp",
    icon: "/icons/whatsapp.png",
    details: [
      {
        text: COMPANY_CONTACT.whatsapp.display,
        href: COMPANY_CONTACT.whatsapp.url,
      },
      {
        translationKey: "whatsapp_note",
        muted: true,
      },
    ],
  },
  {
    labelKey: "address",
    icon: "/icons/location.png",
    details: [
      {
        text: COMPANY_CONTACT.address.line1,
      },
      {
        text: COMPANY_CONTACT.address.line2,
      },
      {
        translationKey: "maps_label",
        href: COMPANY_CONTACT.address.mapsUrl,
        muted: true,
        underline: true,
      },
    ],
  },
] as const;

export const COMPLAINTS_BOOK_URL = "https://www.livroreclamacoes.pt/Inicio/";

export const CNPD_URL = "https://www.cnpd.pt";

export const PRIVACY_POLICY_CONTACT = {
  email: {
    address: "apoiocliente@nosnorte.com",
    mailto: "mailto:apoiocliente@nosnorte.com",
  },
  phone: {
    display: COMPANY_CONTACT.phone.display,
    tel: COMPANY_CONTACT.phone.tel,
  },
  address: "Rua de Feixe, nº. 6, freguesia de Tebosa, 4705-630 Braga.",
} as const;

export const FOOTER_INFO_LINKS = [
  {
    translationKey: "quality_policy",
    href: "/politica-de-qualidade",
  },
  {
    translationKey: "privacy_policy",
    href: "/politica-de-privacidade",
  },
  {
    translationKey: "code_of_conduct",
    href: "/codigo-de-conduta",
  },
  {
    translationKey: "dispute_resolution",
  },
  {
    translationKey: "complaints_book",
    href: COMPLAINTS_BOOK_URL,
    external: true,
  },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  {
    labelKey: "instagram",
    href: "https://www.instagram.com/nosnorte/",
    icon: "/icons/instagram.png",
  },
  {
    labelKey: "facebook",
    href: "https://www.facebook.com/nosnorte",
    icon: "/icons/facebook.png",
  },
] as const;
