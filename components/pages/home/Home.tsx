import Hero from "./hero/Hero";
import Service from "./service/Service";
import Companies from "./copmanies/index";
import "../../../styles/globals.css"
export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <Companies />
    </>
  );
}
