import { CenteredHero } from "./components/CenteredHero";
import { Section } from "./components/Section";

export const Hero = () => {
  return (
    <Section className="py-18">
      <CenteredHero
        title={
            
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
             Waste less time and see clearly what you need to learn to get hired as a Dev
          </span>
        }
        description={
          "The most data driven resource to understand the market demands for software engineering."
        }
        banner={undefined}
        buttons={undefined}
      />
    </Section>
  );
};
