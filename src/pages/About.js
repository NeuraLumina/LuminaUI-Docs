import { Column, Container, Row, Text, Card, Image, Divider, Button } from "@neuralumina/lumina-ui";

// Team members data
const teamMembers = [
  {
    name: "Neura Lumina",
    role: "Creator & Lead Developer",
    bio: "Built LuminaUI from scratch — 15k LOC, zero dependencies, pure JavaScript.",
    avatar: "https://ui-avatars.com/api/?name=Neura+Lumina&background=0f8f67&color=fff&bold=true",
  },
  {
    name: "Lumina Core",
    role: "Open Source Contributors",
    bio: "Community-driven development. All contributions welcome.",
    avatar: "https://ui-avatars.com/api/?name=Lumina+Core&background=246bfe&color=fff&bold=true",
  },
  {
    name: "You",
    role: "Future Contributor",
    bio: "Join the movement. Build with zero dependencies.",
    avatar: "https://ui-avatars.com/api/?name=You&background=6b7280&color=fff&bold=true",
  },
];

// Stats data
const stats = [
  { value: "15,000+", label: "Lines of Code" },
  { value: "0", label: "Dependencies" },
  { value: "50+", label: "Widgets" },
  { value: "100%", label: "Vanilla JS" },
];

export function About() {
  return Container({ className: "container fade-in" }, [
    Column({ gap: 64, style: { padding: "60px 0" } }, [
      // Hero section
      Column({ gap: 20, style: { textAlign: "center" } }, [
        Text("About LuminaUI", {
          as: "h1",
          size: 48,
          weight: 900,
          style: { background: "linear-gradient(135deg, #0f8f67, #246bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
        }),
        Text("A Flutter-inspired UI framework for the web.", {
          size: 20,
          color: "#6b7280",
          style: { maxWidth: 600, margin: "0 auto" },
        }),
      ]),

      // Mission section
      Row({
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          alignItems: "center",
        },
      }, [
        Column({ gap: 16 }, [
          Text("Our Mission", { as: "h2", size: 28, weight: 700 }),
          Text("LuminaUI exists to prove you don't need complex toolchains to build beautiful web interfaces.", {
            size: 16,
            color: "#4b5563",
            lineHeight: 1.6,
          }),
          Text("No JSX. No build step. No npm audit nightmares. Just you, JavaScript, and the DOM.", {
            size: 16,
            color: "#4b5563",
            lineHeight: 1.6,
          }),
          Button({
            text: "View on GitHub",
            variant: "primary",
            onClick: () => window.open("https://github.com/NeuraLumina/luminaUI", "_blank"),
            style: { marginTop: 8, width: "fit-content" },
          }),
        ]),
        Card({
          padding: 32,
          elevation: 2,
          style: { background: "linear-gradient(135deg, #0f8f67, #246bfe)", color: "white", textAlign: "center" },
        }, [
          Column({ gap: 16 }, [
            Text("⚡", { size: 48 }),
            Text("Zero Dependencies", { as: "h3", size: 24, weight: 700 }),
            Text("Not one. Not low. Zero. Every line is written by humans, for humans.", { size: 14, color: "rgba(255,255,255,0.9)" }),
          ]),
        ]),
      ]),

      // Stats section
      Column({ gap: 24 }, [
        Text("By the Numbers", { as: "h2", size: 28, weight: 700, style: { textAlign: "center" } }),
        Row({
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          },
        }, [
          ...stats.map((stat) =>
            Card({ padding: 24, elevation: 1, style: { textAlign: "center" } }, [
              Column({ gap: 8 }, [
                Text(stat.value, { as: "div", size: 36, weight: 900, style: { color: "#0f8f67" } }),
                Text(stat.label, { color: "#6b7280", size: 14 }),
              ]),
            ])
          ),
        ]),
      ]),

      // Philosophy section
      Row({
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        },
      }, [
        Column({ gap: 12 }, [
          Text("🎯", { size: 32 }),
          Text("Simplicity First", { as: "h3", size: 18, weight: 700 }),
          Text("Widgets are just functions. State is explicit. No magic.", { color: "#6b7280", size: 14 }),
        ]),
        Column({ gap: 12 }, [
          Text("🚀", { size: 32 }),
          Text("Performance", { as: "h3", size: 18, weight: 700 }),
          Text("Direct DOM patching. No virtual DOM overhead.", { color: "#6b7280", size: 14 }),
        ]),
        Column({ gap: 12 }, [
          Text("🔒", { size: 32 }),
          Text("Security", { as: "h3", size: 18, weight: 700 }),
          Text("Zero supply chain risks. No vulnerable dependencies.", { color: "#6b7280", size: 14 }),
        ]),
        Column({ gap: 12 }, [
          Text("🌍", { size: 32 }),
          Text("Accessible", { as: "h3", size: 18, weight: 700 }),
          Text("Works anywhere. No build step required.", { color: "#6b7280", size: 14 }),
        ]),
      ]),

      Divider(),

      // Team section
      Column({ gap: 24 }, [
        Text("The Team", { as: "h2", size: 28, weight: 700, style: { textAlign: "center" } }),
        Row({
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          },
        }, [
          ...teamMembers.map((member) =>
            Card({ padding: 24, elevation: 2 }, [
              Column({ gap: 16, style: { alignItems: "center", textAlign: "center" } }, [
                Image({
                  src: member.avatar,
                  alt: member.name,
                  style: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover" },
                }),
                Column({ gap: 4 }, [
                  Text(member.name, { as: "h3", size: 18, weight: 700 }),
                  Text(member.role, { size: 12, color: "#0f8f67", weight: 600 }),
                  Text(member.bio, { size: 14, color: "#6b7280" }),
                ]),
              ]),
            ])
          ),
        ]),
      ]),

      Divider(),

      // CTA section
      Card({
        padding: 48,
        elevation: 2,
        style: {
          background: "linear-gradient(135deg, #0f8f67, #246bfe)",
          color: "white",
          textAlign: "center",
        },
      }, [
        Column({ gap: 20 }, [
          Text("Ready to build something great?", { as: "h2", size: 28, weight: 700 }),
          Text("Join the zero-dependency movement. Start using LuminaUI today.", {
            size: 16,
            color: "rgba(255,255,255,0.9)",
          }),
          Row({ gap: 16, style: { justifyContent: "center" } }, [
            Button({
              text: "Get Started",
              variant: "primary",
              onClick: () => window.location.hash = "#",
              style: { backgroundColor: "white", color: "#0f8f67" },
            }),
            Button({
              text: "GitHub",
              variant: "secondary",
              onClick: () => window.open("https://github.com/NeuraLumina/luminaUI", "_blank"),
              style: { backgroundColor: "transparent", borderColor: "white", color: "white" },
            }),
          ]),
        ]),
      ]),
    ]),
  ]);
}