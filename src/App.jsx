import Navbar from "./components/Navbar";
import heroImg from "./assets/hero.jpg";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section>
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-[620px] object-cover"
        />
      </section>
    </div>
  );
}
