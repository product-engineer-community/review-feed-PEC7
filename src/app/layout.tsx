"use client";

import "@/app/globals.css";

import { LocationProvider } from "@/entities/location";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <LocationProvider>{children}</LocationProvider>
      </body>
    </html>
  );
}
