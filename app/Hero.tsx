import { CenteredHero } from "./components/CenteredHero";
import { Section } from "./components/Section";

export const Hero = () => {
  return (
    <Section className="py-18">
      <CenteredHero
        title={
            
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Some bullshit about SWE and AI! Coming to a website near you!
          </span>
        }
        description={
          "The most data driven resource to understand the market demands for bullshit."
        }
        banner={undefined}
        buttons={undefined}
      />
    </Section>
  );
};
