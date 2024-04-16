import "../styles/global.css";
import { PlantProvider } from "../context/PlantContext";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PlantProvider>
        <Component {...pageProps} />{" "}
      </PlantProvider>
    </AuthProvider>
  );
}
