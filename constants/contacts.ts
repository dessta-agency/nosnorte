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
    line1: "Rua de Feixe 6, 4705-630",
    line2: "Tebosa - Braga",
    mapsUrl:
      "https://www.google.com/maps/place/N%C3%B3s-Norte+-+Materiais+de+Constru%C3%A7%C3%A3o/@41.475936,-8.4846669,17z/data=!3m1!4b1!4m6!3m5!1s0xd24f877c0a3f573:0x50e4484ae3e5f4ed!8m2!3d41.475932!4d-8.482092!16s%2Fg%2F1tgtgsmm?entry=ttu&g_ep=EgoyMDI2MDkyMS4wIKXMDSoASAFQAw%3D%3D",
  },
} as const;

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
