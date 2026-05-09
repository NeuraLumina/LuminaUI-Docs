import "./style.css";
import {
  Button,
  Card,
  Column,
  Container,
  Divider,
  Image,
  Row,
  SnackBar,
  Text,
  TextField,
  mount,
  useState,
} from "@chimuka_amel/lumina-ui";

const [activeSection, setActiveSection, subscribeActiveSection] = useState("overview");
const [searchTerm, setSearchTerm, subscribeSearchTerm] = useState("");
const [toast, setToast, subscribeToast] = useState(null);
const subscribedUpdates = new WeakSet();

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "mental-model", label: "Mental Model" },
  { id: "state", label: "State" },
  { id: "widgets", label: "Widgets" },
  { id: "imports", label: "Imports" },
  { id: "examples", label: "Examples" },
  { id: "deployment", label: "Deployment" },
];

const highlights = [
  {
    title: "Plain JavaScript",
    body: "Build interfaces as function calls that return small virtual node objects. No JSX transform required.",
  },
  {
    title: "Flutter-inspired layout",
    body: "Compose Row, Column, Container, Padding, Stack, and Card widgets with predictable props.",
  },
  {
    title: "Tiny state primitive",
    body: "useState returns explicit getter, setter, and subscriber functions that work with mount().",
  },
  {
    title: "Real DOM output",
    body: "LuminaUI renders browser DOM nodes directly and patches updates from the widget tree.",
  },
];

const widgetGroups = [
  {
    group: "Layout",
    imports: "Column, Row, Container, Center, Align, Padding, SizedBox, Wrap, Stack, Card, Divider",
    widgets: [
      ["Column", "Vertical flex layout with gap, padding, and alignment props."],
      ["Row", "Horizontal flex layout for toolbars, action groups, and inline content."],
      ["Container", "General box for sizing, spacing, color, decoration, and alignment."],
      ["Card", "Raised surface built on Container with padding, border, radius, and shadow."],
      ["Stack", "Relative layer container for Positioned children."],
      ["Divider", "Horizontal or vertical separator."],
    ],
  },
  {
    group: "Controls",
    imports: "Button, Input, TextField, Checkbox, Switch",
    widgets: [
      ["Button", "Primary, secondary, text, and danger actions."],
      ["TextField", "Single-line input with LuminaUI field styling."],
      ["Checkbox", "Boolean selection with label and change callback."],
      ["Switch", "Accessible switch button for binary settings."],
    ],
  },
  {
    group: "Forms",
    imports: "Form, FormField, Dropdown, Radio, RadioGroup, Slider, TextArea",
    widgets: [
      ["Form", "Submit-safe form wrapper with configurable gap."],
      ["FormField", "Label, required marker, helper text, and error text wrapper."],
      ["Dropdown", "Select control with options and placeholder support."],
      ["Slider", "Range input that returns numeric values."],
      ["TextArea", "Multi-line field with LuminaUI focus behavior."],
    ],
  },
  {
    group: "Display",
    imports: "Text, Heading, Caption, Image, Icon, Badge, CircleAvatar, Placeholder",
    widgets: [
      ["Text", "Typography primitive with size, weight, color, alignment, and semantic tag props."],
      ["Image", "Responsive image widget with fit, radius, width, height, and alt props."],
      ["Badge", "Overlay count or status marker around child content."],
      ["CircleAvatar", "Circular image or initials avatar."],
    ],
  },
  {
    group: "Feedback",
    imports: "SnackBar, Dialog, AlertDialog, Tooltip, LinearProgressIndicator, CircularProgressIndicator",
    widgets: [
      ["SnackBar", "Fixed status message with optional action."],
      ["Dialog", "Modal shell with barrier, width, and dismiss behavior."],
      ["Tooltip", "Title-backed tooltip wrapper."],
      ["LinearProgressIndicator", "Determinate or indeterminate progress bar."],
    ],
  },
  {
    group: "Navigation",
    imports: "AppBar, BottomNavigationBar, Drawer, NavigationRail, Scaffold, TabBar, TabBarView",
    widgets: [
      ["Scaffold", "Application shell with app bar, body, drawer, and bottom navigation slots."],
      ["AppBar", "Header bar with title, leading content, and actions."],
      ["TabBar", "Accessible tab list with controlled value."],
      ["NavigationRail", "Side navigation for app-like layouts."],
    ],
  },
];

const installCode = `npm install @chimuka_amel/lumina-ui`;

const quickStartCode = `import { mount, Column, Text, Button } from "@chimuka_amel/lumina-ui";

function App() {
  return Column({ gap: 12, padding: 16 }, [
    Text("Hello from LuminaUI", { size: 24, weight: 800 }),
    Button({
      text: "Click me",
      onClick: () => console.log("clicked"),
    }),
  ]);
}

mount(App, document.getElementById("app"));`;

const stateCode = `import { mount, useState, Column, Row, Text, Button } from "@chimuka_amel/lumina-ui";

const [count, setCount, subscribeCount] = useState(0);
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeCount(forceUpdate);
  subscribed.add(forceUpdate);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Column({ gap: 12 }, [
    Text(\`Count: \${count()}\`, { weight: 800 }),
    Row({ gap: 8 }, [
      Button({ text: "-", onClick: () => setCount((value) => value - 1) }),
      Button({ text: "+", onClick: () => setCount((value) => value + 1) }),
    ]),
  ]);
}

mount(App, document.getElementById("app"));`;

const layoutCode = `Column({ gap: 16 }, [
  Row({ gap: 8, mainAxisAlignment: "spaceBetween" }, [
    Text("Project", { weight: 800 }),
    Button({ text: "Deploy" }),
  ]),
  Card({ padding: 16, elevation: 2 }, [
    Text("Everything here is a LuminaUI widget."),
  ]),
]);`;

const importCode = `import {
  mount,
  useState,
  Column,
  Row,
  Container,
  Text,
  Button,
} from "@chimuka_amel/lumina-ui";

import { Column, Row } from "@chimuka_amel/lumina-ui/widgets/layout";
import { Button } from "@chimuka_amel/lumina-ui/widgets/controls";`;

function bindState(forceUpdate) {
  if (subscribedUpdates.has(forceUpdate)) return;
  subscribeActiveSection(forceUpdate);
  subscribeSearchTerm(forceUpdate);
  subscribeToast(forceUpdate);
  subscribedUpdates.add(forceUpdate);
}

function notify(message) {
  const id = Date.now();
  setToast({ id, message });
  window.setTimeout(() => {
    if (toast()?.id === id) setToast(null);
  }, 2800);
}

function goToSection(id) {
  setActiveSection(id);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function copyCode(code) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code);
    notify("Code copied");
    return;
  }

  notify("Clipboard API unavailable");
}

function RawElement(tag, props = {}, children = []) {
  return { tag, props, children };
}

function LinkButton({ href, label, variant = "primary" }) {
  return RawElement("a", {
    href,
    target: "_blank",
    rel: "noreferrer",
    className: `doc-button doc-button-${variant}`,
  }, [label]);
}

function Pill(label, tone = "blue") {
  return RawElement("span", { className: `doc-pill doc-pill-${tone}` }, [label]);
}

function CodeBlock(code, language = "js") {
  return Column({ gap: 0, className: "code-shell" }, [
    Row({
      mainAxisAlignment: "spaceBetween",
      className: "code-toolbar",
    }, [
      Text(language, { size: 12, weight: 800, color: "#7d8aa0" }),
      Button({
        text: "Copy",
        variant: "text",
        onClick: () => copyCode(code),
        style: { minHeight: "28px", padding: "4px 8px" },
      }),
    ]),
    RawElement("pre", { className: "code-block" }, [
      RawElement("code", {}, [code]),
    ]),
  ]);
}

function Section({ id, eyebrow, title, intro, children }) {
  return RawElement("section", { id, className: "docs-section" }, [
    Column({ gap: 16 }, [
      Column({ gap: 8 }, [
        eyebrow ? Text(eyebrow, { size: 12, weight: 900, color: "#2563eb", style: { textTransform: "uppercase" } }) : null,
        Text(title, { as: "h2", size: 32, weight: 900 }),
        intro ? Text(intro, { size: 17, color: "#5f6b7a", lineHeight: 1.65 }) : null,
      ]),
      ...children,
    ]),
  ]);
}

function HighlightCard(item) {
  return Card({ padding: 20, radius: 8, elevation: 1, className: "highlight-card" }, [
    Column({ gap: 10 }, [
      Text(item.title, { as: "h3", size: 18, weight: 900 }),
      Text(item.body, { color: "#5f6b7a", lineHeight: 1.6 }),
    ]),
  ]);
}

function WidgetCard(group, widget) {
  return Card({ padding: 16, radius: 8, elevation: 1, className: "widget-card" }, [
    Column({ gap: 8 }, [
      Row({ gap: 8, style: { alignItems: "center", flexWrap: "wrap" } }, [
        Text(widget[0], { as: "h3", size: 17, weight: 900 }),
        Pill(group, "blue"),
      ]),
      Text(widget[1], { color: "#5f6b7a", lineHeight: 1.55 }),
    ]),
  ]);
}

function filteredWidgetGroups() {
  const term = searchTerm().trim().toLowerCase();
  if (!term) return widgetGroups;

  return widgetGroups
    .map((group) => ({
      ...group,
      widgets: group.widgets.filter(([name, description]) =>
        `${group.group} ${group.imports} ${name} ${description}`.toLowerCase().includes(term)
      ),
    }))
    .filter((group) => group.widgets.length);
}

function Sidebar() {
  return RawElement("aside", { className: "sidebar" }, [
    Column({ gap: 20 }, [
      Row({ gap: 12, style: { alignItems: "center" } }, [
        Image({ src: "/favicon.svg", alt: "LuminaUI logo", width: 42, height: 42, radius: 8 }),
        Column({ gap: 0 }, [
          Text("LuminaUI", { weight: 900, size: 18 }),
          Text("Documentation", { color: "#64748b", size: 12, weight: 700 }),
        ]),
      ]),
      Column({ gap: 6 }, [
        ...navItems.map((item) =>
          RawElement("button", {
            type: "button",
            className: activeSection() === item.id ? "side-link side-link-active" : "side-link",
            onClick: () => goToSection(item.id),
          }, [item.label])
        ),
      ]),
    ]),
  ]);
}

function TopBar() {
  return RawElement("header", { className: "topbar" }, [
    Row({
      mainAxisAlignment: "spaceBetween",
      gap: 16,
      style: { alignItems: "center", flexWrap: "wrap" },
    }, [
      Row({ gap: 10, style: { alignItems: "center" } }, [
        Image({ src: "/favicon.svg", alt: "LuminaUI logo", width: 32, height: 32, radius: 7 }),
        Text("LuminaUI Docs", { weight: 900, size: 18 }),
      ]),
      Row({ gap: 10, style: { alignItems: "center", flexWrap: "wrap" } }, [
        LinkButton({ href: "https://www.npmjs.com/package/@chimuka_amel/lumina-ui", label: "npm", variant: "secondary" }),
        LinkButton({ href: "https://github.com/AmelCMM/LuminaVite", label: "GitHub", variant: "primary" }),
      ]),
    ]),
  ]);
}

function OverviewSection() {
  return Section({
    id: "overview",
    eyebrow: "Framework",
    title: "Build web interfaces with widget-tree JavaScript.",
    intro: "LuminaUI is a lightweight, Flutter-inspired UI library for plain JavaScript apps. It gives you composable widgets, direct DOM rendering, and explicit state without framework runtime baggage.",
    children: [
      Row({ gap: 12, style: { flexWrap: "wrap" } }, [
        Pill("No JSX", "green"),
        Pill("ES modules", "blue"),
        Pill("Real DOM", "amber"),
        Pill("Zero runtime dependencies", "slate"),
      ]),
      Row({ gap: 16, className: "highlight-grid" }, highlights.map(HighlightCard)),
    ],
  });
}

function InstallationSection() {
  return Section({
    id: "installation",
    eyebrow: "Setup",
    title: "Install from npm.",
    intro: "Use LuminaUI inside any JavaScript project that can import ESM packages. Vite works especially well for local development.",
    children: [
      CodeBlock(installCode, "bash"),
      Row({ gap: 12, style: { flexWrap: "wrap" } }, [
        LinkButton({ href: "https://vite.dev/guide/", label: "Vite guide", variant: "secondary" }),
        LinkButton({ href: "https://www.npmjs.com/package/@chimuka_amel/lumina-ui", label: "Package page", variant: "secondary" }),
      ]),
    ],
  });
}

function QuickStartSection() {
  return Section({
    id: "quick-start",
    eyebrow: "First app",
    title: "Mount a widget tree.",
    intro: "Every LuminaUI app starts with a component function and mount(). The component returns widgets, strings, arrays, null, or real DOM nodes.",
    children: [CodeBlock(quickStartCode)],
  });
}

function MentalModelSection() {
  return Section({
    id: "mental-model",
    eyebrow: "Concepts",
    title: "Widgets are functions that describe DOM.",
    intro: "A widget returns a small virtual node object. LuminaUI turns that tree into DOM and patches later renders.",
    children: [
      Row({ gap: 16, className: "docs-two-col" }, [
        Column({ gap: 12 }, [
          Text("Supported render values", { as: "h3", size: 20, weight: 900 }),
          RawElement("ul", { className: "doc-list" }, [
            RawElement("li", {}, ["Virtual node objects: { tag, props, children, key }"]),
            RawElement("li", {}, ["Strings and numbers"]),
            RawElement("li", {}, ["Arrays of children"]),
            RawElement("li", {}, ["null, undefined, or false for empty output"]),
            RawElement("li", {}, ["Real DOM Node values when needed"]),
          ]),
        ]),
        Column({ gap: 12 }, [
          Text("Calling styles", { as: "h3", size: 20, weight: 900 }),
          CodeBlock(`Column([
  Text("Compact child style"),
])

Column({ gap: 12, padding: 16 }, [
  Text("Configured props style"),
])`),
        ]),
      ]),
    ],
  });
}

function StateSection() {
  return Section({
    id: "state",
    eyebrow: "Reactivity",
    title: "State is explicit and subscription-based.",
    intro: "useState returns [get, set, subscribe]. Subscribe the renderer forceUpdate function once, then read values through getters during render.",
    children: [
      CodeBlock(stateCode),
      Row({ gap: 16, className: "docs-two-col" }, [
        Column({ gap: 8 }, [
          Text("Getter", { weight: 900, size: 18 }),
          Text("Call getValue() inside your render function to read current state.", { color: "#5f6b7a", lineHeight: 1.6 }),
        ]),
        Column({ gap: 8 }, [
          Text("Setter", { weight: 900, size: 18 }),
          Text("Call setValue(next) or setValue((previous) => next) from events.", { color: "#5f6b7a", lineHeight: 1.6 }),
        ]),
        Column({ gap: 8 }, [
          Text("Subscribe", { weight: 900, size: 18 }),
          Text("Register forceUpdate once so state changes trigger a render.", { color: "#5f6b7a", lineHeight: 1.6 }),
        ]),
      ]),
    ],
  });
}

function WidgetsSection() {
  const groups = filteredWidgetGroups();

  return Section({
    id: "widgets",
    eyebrow: "API",
    title: "Widget reference.",
    intro: "Search the current public widget families exported by @chimuka_amel/lumina-ui.",
    children: [
      TextField({
        value: searchTerm(),
        placeholder: "Search widgets, groups, or props...",
        onChange: setSearchTerm,
        className: "docs-search",
      }),
      groups.length
        ? Column({ gap: 28 }, groups.map((group) =>
            Column({ gap: 12 }, [
              Row({ gap: 12, style: { alignItems: "baseline", flexWrap: "wrap" } }, [
                Text(group.group, { as: "h3", size: 22, weight: 900 }),
                Text(group.imports, { size: 13, color: "#64748b", maxLines: 2 }),
              ]),
              Row({ gap: 14, className: "widget-grid" }, group.widgets.map((widget) => WidgetCard(group.group, widget))),
            ])
          ))
        : Text("No widgets match that search.", { color: "#64748b" }),
    ],
  });
}

function ImportsSection() {
  return Section({
    id: "imports",
    eyebrow: "Modules",
    title: "Import from the package entry or subpaths.",
    intro: "The top-level entry exports the framework API. Subpath imports are available when you want smaller, explicit module boundaries.",
    children: [CodeBlock(importCode)],
  });
}

function ExamplesSection() {
  return Section({
    id: "examples",
    eyebrow: "Patterns",
    title: "Common composition pattern.",
    intro: "Keep structure, behavior, and local styles together in one JavaScript widget tree.",
    children: [
      CodeBlock(layoutCode),
      Container({ className: "live-example" }, [
        Column({ gap: 16 }, [
          Row({ gap: 8, mainAxisAlignment: "spaceBetween", style: { flexWrap: "wrap" } }, [
            Text("Live preview", { weight: 900, size: 18 }),
            Button({ text: "Deploy", onClick: () => notify("Deploy action clicked") }),
          ]),
          Card({ padding: 16, radius: 8, elevation: 1 }, [
            Text("Everything here is a LuminaUI widget.", { color: "#5f6b7a" }),
          ]),
        ]),
      ]),
    ],
  });
}

function DeploymentSection() {
  return Section({
    id: "deployment",
    eyebrow: "Production",
    title: "Build static output with Vite.",
    intro: "LuminaUI ships as browser-friendly ESM. Build with Vite and deploy the generated dist folder to any static host.",
    children: [
      CodeBlock(`npm run build
npm run preview`, "bash"),
      RawElement("ul", { className: "doc-list" }, [
        RawElement("li", {}, ["Vite writes optimized assets to dist/."]),
        RawElement("li", {}, ["The built files can be hosted on Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static server."]),
        RawElement("li", {}, ["No server runtime is required for the docs site itself."]),
      ]),
    ],
  });
}

function DocsContent() {
  return RawElement("main", { className: "docs-content" }, [
    OverviewSection(),
    InstallationSection(),
    QuickStartSection(),
    MentalModelSection(),
    StateSection(),
    WidgetsSection(),
    ImportsSection(),
    ExamplesSection(),
    DeploymentSection(),
  ]);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Container({ className: "docs-app" }, [
    TopBar(),
    Row({ className: "docs-layout", gap: 0, style: { alignItems: "flex-start" } }, [
      Sidebar(),
      DocsContent(),
    ]),
    toast()
      ? SnackBar({
          key: toast().id,
          open: true,
          message: toast().message,
          action: Button({
            text: "Dismiss",
            variant: "text",
            onClick: () => setToast(null),
            style: { color: "#ffffff" },
          }),
        })
      : null,
  ]);
}

mount(App, document.getElementById("app"));
