import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/providers";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
