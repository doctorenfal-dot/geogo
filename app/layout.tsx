import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GeoGo',
  description: 'Türkiye Harita ve İl Konum Testi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
