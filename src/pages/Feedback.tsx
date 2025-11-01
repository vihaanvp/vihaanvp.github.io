import Navigation from "@/components/Navigation";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const Feedback = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle className="mb-4">your feedback matters!</SectionTitle>
          
          <p className="text-foreground/80 mb-8 leading-relaxed">
            This is the official feedback form, so please spare 1 minute to fill out the form to make the website better for everyone!
            <br />
            I appreciate your thoughts!
          </p>

          <div className="relative rounded-lg overflow-hidden border border-primary/30 bg-card p-2 hover:border-primary transition-all duration-500 glow-border">
            <iframe
              width="100%"
              height="600px"
              src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAVIhJ3JUMlVBWUdJTjFEV0VTQU8xMFFQN0JOSzJEVC4u&embed=true"
              frameBorder="0"
              marginWidth={0}
              marginHeight={0}
              style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-6">
        <Footer />
      </div>
    </div>
  );
};

export default Feedback;
