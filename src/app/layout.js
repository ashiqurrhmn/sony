import "./globals.css";

export const metadata = {
  title: "Sony WH-1000XM6 | Silence, Perfected",
  description:
    "Flagship wireless noise cancelling headphones, re-engineered for a world that never stops. Experience studio-grade clarity with adaptive noise cancelling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <head>
        {/* Fontshare CDN for Switzer (Neo-grotesque Swiss sans-serif) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
