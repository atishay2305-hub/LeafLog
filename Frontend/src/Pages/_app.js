import "../styles/global.css";
import { PlantProvider } from "../context/PlantContext";

export default function App({ Component, pageProps }) {
  return (
    <PlantProvider>
      <Component {...pageProps} />{" "}
    </PlantProvider>
  );
}
