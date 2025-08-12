import { Hackathon } from "@/types";
import { validateHackathon } from "@/lib/validation";

// Sample hackathons data - replace with actual hackathon projects
export const hackathonsData: Hackathon[] = [
  {
    name: "TechCrunch Disrupt Hackathon 2023",
    project: "EcoTrack - Carbon Footprint Tracker",
    description:
      "A mobile app that helps users track and reduce their carbon footprint through gamification and community challenges.",
    position: "1st Place Winner",
    date: "October 2023",
    tech: ["React Native", "Node.js", "MongoDB", "Express", "Chart.js"],
    image: "/images/hackathons/ecotrack.jpg",
    github: "https://github.com/username/ecotrack-hackathon",
    demo: "https://ecotrack-demo.vercel.app",
  },
  {
    name: "NASA Space Apps Challenge 2023",
    project: "SolarViz - Solar System Explorer",
    description:
      "An interactive 3D visualization of the solar system with real-time data from NASA APIs.",
    position: "2nd Place Winner",
    date: "September 2023",
    tech: ["Three.js", "React", "NASA APIs", "WebGL", "TypeScript"],
    image: "/images/hackathons/solarviz.jpg",
    github: "https://github.com/username/solarviz-nasa",
    demo: "https://solarviz-demo.vercel.app",
  },
  {
    name: "Global Game Jam 2023",
    project: "RootBound - Plant Growth Simulator",
    description:
      "A relaxing puzzle game where players help plants grow by managing resources and solving environmental challenges.",
    position: "Best Innovation Award",
    date: "February 2023",
    tech: ["Unity", "C#", "Procedural Generation", "Mobile Development"],
    image: "/images/hackathons/rootbound.jpg",
    github: "https://github.com/username/rootbound-game",
    demo: "https://rootbound-game.itch.io",
  },
  {
    name: "AngelHack Silicon Valley 2022",
    project: "MindfulAI - Mental Health Assistant",
    description:
      "An AI-powered mental health companion that provides personalized meditation sessions and mood tracking.",
    position: "3rd Place Winner",
    date: "November 2022",
    tech: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
    image: "/images/hackathons/mindfulai.jpg",
    github: "https://github.com/username/mindfulai-hackathon",
  },
];

// Validate hackathons data
const validateHackathonsData = (): void => {
  const errors: string[] = [];

  hackathonsData.forEach((hackathon, index) => {
    const error = validateHackathon(hackathon);
    if (error) {
      errors.push(`Hackathon ${index + 1} (${hackathon.name}): ${error}`);
    }
  });

  if (errors.length > 0) {
    console.warn("Hackathons data validation errors:", errors);
  }
};

// Run validation in development
if (process.env.NODE_ENV === "development") {
  validateHackathonsData();
}

// Helper functions for hackathons data
export const getWinningHackathons = (): Hackathon[] => {
  const winningPositions = ["1st", "2nd", "3rd", "winner", "place"];
  return hackathonsData.filter((hackathon) =>
    winningPositions.some((position) =>
      hackathon.position.toLowerCase().includes(position)
    )
  );
};

export const getHackathonsByYear = (year: number): Hackathon[] => {
  return hackathonsData.filter((hackathon) =>
    hackathon.date.includes(year.toString())
  );
};

export const getHackathonsByTech = (tech: string): Hackathon[] => {
  return hackathonsData.filter((hackathon) =>
    hackathon.tech.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

export const getRecentHackathons = (count: number = 5): Hackathon[] => {
  return hackathonsData
    .sort((a, b) => {
      const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
      const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
      return yearB - yearA;
    })
    .slice(0, count);
};

export const getAllHackathonTechs = (): string[] => {
  const allTechs = hackathonsData.flatMap((hackathon) => hackathon.tech);
  return Array.from(new Set(allTechs));
};

export const getHackathonStats = () => {
  const total = hackathonsData.length;
  const wins = getWinningHackathons().length;
  const techs = getAllHackathonTechs().length;

  return {
    totalHackathons: total,
    wins,
    uniqueTechnologies: techs,
    winRate: total > 0 ? Math.round((wins / total) * 100) : 0,
  };
};

export const searchHackathons = (query: string): Hackathon[] => {
  const searchTerm = query.toLowerCase();
  return hackathonsData.filter(
    (hackathon) =>
      hackathon.name.toLowerCase().includes(searchTerm) ||
      hackathon.project.toLowerCase().includes(searchTerm) ||
      hackathon.description.toLowerCase().includes(searchTerm) ||
      hackathon.tech.some((tech) => tech.toLowerCase().includes(searchTerm))
  );
};

// Default export
export default hackathonsData;
