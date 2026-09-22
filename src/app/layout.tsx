import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/api";
import { Analytics } from "@vercel/analytics/next"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="id">
      <head>
        {/* Smile Concept fonts (matches prototype) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600&family=Inclusive+Sans&family=Playfair+Display:wght@400;500&display=swap"
        />
      </head>
      <body className="antialiased bg-white text-ink font-body">
        <Navbar settings={settings.data} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings.data} />
        <Analytics />
      </body>
    </html>
  );
}
