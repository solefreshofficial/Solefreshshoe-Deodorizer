import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Science from "@/components/Science";
import HowToUse from "@/components/HowToUse";
import Ingredients from "@/components/Ingredients";
import ProductDetails from "@/components/ProductDetails";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section id="science">
          <Science />
        </section>
        <HowToUse />
        <section id="ingredients">
          <Ingredients />
        </section>
        <section id="details">
          <ProductDetails />
        </section>
        <UseCases />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
