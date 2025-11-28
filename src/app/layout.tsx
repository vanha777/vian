import type { Metadata } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import MainLayout from "@/components/Layout/MainLayout";

export const metadata: Metadata = {
  title: "Vian Property Agency",
  description: "Next Gen Property Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
