import Script from "next/script";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prateek Srivastava",
    alternateName: ["Prateek", "Prats"],
    description:
      "Experienced Software Developer specializing in Angular, Next.js, Python, and payment systems with 3+ years of professional experience.",
    url: "https://prats2311.tech",
    image: "https://prats2311.tech/og-image.jpg",
    sameAs: [
      "https://github.com/prats-2311",
      "https://www.linkedin.com/in/prats2311/",
      "https://www.youtube.com/@cseCatalyst",
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "Amino Technology Limited",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "India",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Educational Institution",
    },
    knowsAbout: [
      "Angular",
      "Next.js",
      "React",
      "Python",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Payment Gateway Development",
      "ERP Systems",
      "Web Development",
      "Software Engineering",
      "Full Stack Development",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationLocation: {
        "@type": "City",
        name: "Delhi, India",
      },
      skills: [
        "Angular Development",
        "Next.js Development",
        "Python Programming",
        "Payment Gateway Integration",
        "ERP Development",
        "API Development",
        "Frontend Development",
        "Backend Development",
      ],
    },
    email: "prateek.srivastava2311@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "India",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prateek Srivastava - Software Developer Portfolio",
    alternateName: "Prateek Srivastava Portfolio",
    url: "https://prats2311.tech",
    description:
      "Professional portfolio of Prateek Srivastava, an experienced Software Developer specializing in Angular, Next.js, Python, and payment systems.",
    author: {
      "@type": "Person",
      name: "Prateek Srivastava",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://prats2311.tech/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Prateek Srivastava - Software Development Services",
    description:
      "Professional software development services specializing in Angular, Next.js, Python, and payment gateway solutions.",
    provider: {
      "@type": "Person",
      name: "Prateek Srivastava",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "Web Development",
      "Angular Development",
      "Next.js Development",
      "Python Development",
      "Payment Gateway Integration",
      "ERP Development",
      "API Development",
    ],
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
    </>
  );
}
