import "../globals.css";
import type { Metadata } from "next";
import MenuBar from "./components/menubar"; 
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
