import { Fredoka } from "next/font/google";
import "./reset.css";
import "./globals.css";
import Header from "@/components/Header.jsx";

export const metadata = {
  title: "Life Saver Home Care",
  description: "Empowering independence one home at a time. Your trusted partner in personalized home health care.",
};

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={fredoka.className} >
        <Header />
        {children}
      </body>
    </html >
  );
}
