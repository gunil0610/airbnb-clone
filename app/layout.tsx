import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modal/Modal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <Modal title="Hello" isOpen />
        {/* <ClientOnly>
        </ClientOnly> */}
        {children}
      </body>
    </html>
  );
}
