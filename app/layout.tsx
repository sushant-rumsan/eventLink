import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { QueryProvider } from "./context/queryProvider";
import { Wagmi } from "./context/wagmi.provider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <title>EventLink: Your web3 events gateway</title>
      <body className={inter.className}>
        <Wagmi>
          <QueryProvider>
            <Header />
            <main className='container mx-auto px-4 py-8'>{children}</main>
            <Toaster />
          </QueryProvider>
        </Wagmi>
      </body>
    </html>
  );
}
