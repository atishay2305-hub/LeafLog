import Image from "next/image";
import Header from "../app/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </>
  );
}
