import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/providers";
import { ThemeProvider } from "@/providers/Themecontext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
