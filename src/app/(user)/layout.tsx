import AppHeader from "@/components/header/app.header";
import AppFooter from "@/components/footer/app.footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tittle from layout",
  description: "Content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
    </>
  );
}
