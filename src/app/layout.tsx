import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "./lib/next.auth.wrapper";
import { ToastProvider } from "@/components/utils/toast/useToast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <ToastProvider>{children}</ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
