import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Science from "@/components/Science";
import HowToUse from "@/components/HowToUse";
import Ingredients from "@/components/Ingredients";
import ProductDetails from "@/components/ProductDetails";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section id="science">
          <Reveal>
            <Science />
          </Reveal>
        </section>
        <Reveal>
          <HowToUse />
        </Reveal>
        <section id="ingredients">
          <Reveal>
            <Ingredients />
          </Reveal>
        </section>
        <section id="details">
          <Reveal>
            <ProductDetails />
          </Reveal>
        </section>
        <Reveal>
          <UseCases />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
