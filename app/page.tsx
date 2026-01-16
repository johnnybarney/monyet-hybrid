import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  return (
    <main>
      <HomeHero
        teamName="Monyet Hybrid FC"
        logoSrc="/brand/MHlogo.jpeg"
        slides={[
          { src: "/hero/nizam1.jpg", alt: "Player 1" },
          { src: "/hero/nizam2.jpg", alt: "Player 2" },
          { src: "/hero/nizam3.jpg", alt: "Player 3" },
        ]}
        intervalMs={4500}
      />
    </main>
  );
}
