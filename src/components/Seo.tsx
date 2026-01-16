import Head from 'next/head';

export default function Seo() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Bavely Tawfik",
            url: "https://pavli-tawfik.com",
            image: "https://pavli-tawfik.com/logo-dark.svg",
            sameAs: [
              "https://github.com/bavely",
              "https://www.linkedin.com/in/bavelytawfik"
            ],
            jobTitle: "Full Stack Web Developer",
            worksFor: {
              "@type": "Organization",
              name: "Bavely Tawfik"
            }
          })
        }}
      />
    </Head>
  );
}
