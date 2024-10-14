import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
