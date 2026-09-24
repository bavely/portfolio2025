import type { Metadata } from "next";

const openGraphImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Bavely Tawfik — Full-Stack Web Developer",
};

export function createPageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const socialTitle = `${title} | Bavely Tawfik`;

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title: socialTitle,
      description,
      url: pathname,
      siteName: "Bavely Tawfik Portfolio",
      images: [openGraphImage],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og-image.png"],
      creator: "@bavely",
    },
  };
}
