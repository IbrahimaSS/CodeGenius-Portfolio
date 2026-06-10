import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Ibrahima Sory Soumah | Développeur Full-Stack",
  description = "Portfolio d'Ibrahima Sory Soumah, Développeur Full-Stack expert en React, Spring Boot, Laravel et Node.js.",
  name = "Ibrahima Sory Soumah",
  type = "website",
  url = "https://soumah.dev",
  image = "https://soumah.dev/og-image.jpg"
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={name} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
