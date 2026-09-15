// import { Blog } from '@prisma/client';
import Head from "next/head";

type Props = {
  data: Partial<Post>;
  schemaType: "WebPage" | "BlogPosting" | "Dentist" | "Person";
};

const generateJsonLd = ({ data, schemaType }: Props) => {
  if (schemaType === "WebPage") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "TechSpark",
      url: "https://www.techspark.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.techspark.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };
    // {
    //     "@context": "https://schema.org",
    //     "@type": "Organization",
    //     "name": "TechSpark",
    //     "url": "https://www.techspark.com",
    //     "logo": "https://www.techspark.com/logo.png",
    //     "sameAs": [
    //       "https://www.facebook.com/techspark",
    //       "https://www.twitter.com/techspark"
    //     ]
    //   }
  }

  if (schemaType === 'BlogPosting') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title ?? '',
      description: data.description ?? '',
      image: data.thumbnail?.url ?? '',
      author: {
        '@type': 'Person',
        name: data?.author?.name ?? ''
      },
      datePublished: data.published_at ?? '',
      publisher: {
        '@type': 'Organization',
        name: 'Smile Concept',
        logo: {
          '@type': 'ImageObject',
          url: 'https://smileconcept.id/assets/smile-concept/Logo1.png'
        }
      }
    }
  }

  if (schemaType === "Dentist") {
    return {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: "BrightSmile Dental Clinic",
      image: "https://brightsmile.com/images/clinic.jpg",
      url: "https://brightsmile.com",
      telephone: "+65 6123 4567",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Orchard Road, #05-01",
        addressLocality: "Singapore",
        postalCode: "238888",
        addressCountry: "SG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 1.3048,
        longitude: 103.8318,
      },
      openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-13:00"],
      priceRange: "$$",
      sameAs: [
        "https://www.facebook.com/brightsmile",
        "https://www.instagram.com/brightsmileclinic",
      ],
    };
  }

  if (schemaType === "Person") {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dr. Amanda Lee",
      jobTitle: "Senior Dental Surgeon",
      worksFor: {
        "@type": "Dentist",
        name: "BrightSmile Dental Clinic",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "National University of Singapore",
      },
      medicalSpecialty: "Orthodontics",
      url: "https://brightsmile.com/team/dr-amanda-lee",
      image: "https://brightsmile.com/images/team/amanda.jpg",
    };
  }
};

export default function JsonLd({ data, schemaType }: Props) {
  const jsonLd = generateJsonLd({ data, schemaType });

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
