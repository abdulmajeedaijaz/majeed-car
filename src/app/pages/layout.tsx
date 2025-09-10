import "../globals.css";
import type { Metadata } from "next";
import MenuBar from "./components/menubar"; // ✅ adjust path if needed

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <MenuBar />
        <main style={{ paddingTop: "60px" }}>{children}</main>
      </body>
    </html>
  );
}
