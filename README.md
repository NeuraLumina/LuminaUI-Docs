# LuminaUI + Vite

A starter template for building apps with LuminaUI and Vite. Hot reload, zero config, and the full widget library ready to go.

## Quick start

```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install @chimuka_amel/lumina-ui
npm run dev
```

Open `http://localhost:5173`. That's it.

---

## Project structure

```text
my-app/
├── index.html
├── package.json
└── src/
    ├── main.js
    └── style.css
```

No extra config files. Vite picks up LuminaUI's ES modules without any setup.

---

## Minimal setup

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LuminaUI + Vite</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, Inter, sans-serif; background: #f5f7fa; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### `src/main.js`

```js
import { mount, Column, Text, Button, useState } from "@chimuka_amel/lumina-ui";

const [count, setCount, subscribeCount] = useState(0);

function App(forceUpdate) {
  subscribeCount(forceUpdate);

  return Column({ gap: 16, style: { minHeight: "100vh", padding: "48px" } }, [
    Text(`Count: ${count()}`, { size: 24, weight: 700 }),
    Button({
      text: "Click me",
      onClick: () => setCount((c) => c + 1),
      variant: "primary",
    }),
  ]);
}

mount(App, document.getElementById("app"));
```

---

## A more complete example

Forms, cards, and state — closer to a real app.

```js
import {
  mount,
  Column,
  Container,
  Text,
  Button,
  Card,
  TextField,
  Heading,
  Divider,
  useState,
} from "@chimuka_amel/lumina-ui";

const [name, setName, subscribeName] = useState("");
const [email, setEmail, subscribeEmail] = useState("");
const [submitted, setSubmitted, subscribeSubmitted] = useState(false);
const subscribed = new WeakSet();

function bind(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeName(forceUpdate);
  subscribeEmail(forceUpdate);
  subscribeSubmitted(forceUpdate);
  subscribed.add(forceUpdate);
}

function App(forceUpdate) {
  bind(forceUpdate);

  if (submitted()) {
    return Container({ style: { minHeight: "100vh" }, padding: 48 }, [
      Card({ padding: 32, elevation: 2 }, [
        Column({ gap: 16 }, [
          Heading({ level: 2 }, "Welcome!"),
          Text(`Name: ${name()}`, { weight: 500 }),
          Text(`Email: ${email()}`, { weight: 500 }),
          Divider(),
          Button({
            text: "Start over",
            variant: "secondary",
            onClick: () => { setName(""); setEmail(""); setSubmitted(false); },
          }),
        ]),
      ]),
    ]);
  }

  return Container({ style: { minHeight: "100vh" }, padding: 48 }, [
    Card({ padding: 32, elevation: 2 }, [
      Column({ gap: 24, style: { maxWidth: 480, margin: "0 auto" } }, [
        Heading({ level: 1 }, "LuminaUI + Vite"),
        Text("A UI framework with zero dependencies", { color: "#6b7280" }),
        Divider(),
        Column({ gap: 16 }, [
          TextField({ placeholder: "Your name", value: name(), onChange: setName }),
          TextField({ placeholder: "Your email", type: "email", value: email(), onChange: setEmail }),
          Button({ text: "Submit", onClick: () => setSubmitted(true), variant: "primary" }),
        ]),
      ]),
    ]),
  ]);
}

mount(App, document.getElementById("app"));
```

---

## Todo app

```js
import { mount, Column, Row, Text, Button, TextField, useState } from "@chimuka_amel/lumina-ui";

const [todos, setTodos, subscribeTodos] = useState([]);
const [input, setInput, subscribeInput] = useState("");
const subscribed = new WeakSet();

function bind(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeTodos(forceUpdate);
  subscribeInput(forceUpdate);
  subscribed.add(forceUpdate);
}

function App(forceUpdate) {
  bind(forceUpdate);

  const add = () => {
    if (!input().trim()) return;
    setTodos([...todos(), { id: Date.now(), text: input(), done: false }]);
    setInput("");
  };

  const toggle = (id) =>
    setTodos(todos().map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return Column({ gap: 16, style: { padding: 48, maxWidth: 600, margin: "0 auto" } }, [
    Text("Todos", { size: 32, weight: 900 }),
    Row({ gap: 8 }, [
      TextField({ placeholder: "Add a todo...", value: input(), onChange: setInput, style: { flex: 1 } }),
      Button({ text: "Add", onClick: add, variant: "primary" }),
    ]),
    Column({ gap: 8 }, [
      ...todos().map((todo) =>
        Row({ key: todo.id, gap: 8, style: { alignItems: "center" } }, [
          Button({ text: todo.done ? "✓" : "○", onClick: () => toggle(todo.id), variant: "text", style: { width: 40 } }),
          Text(todo.text, {
            style: todo.done ? { textDecoration: "line-through", color: "#9ca3af" } : {},
          }),
        ])
      ),
    ]),
  ]);
}

mount(App, document.getElementById("app"));
```

---

## Available widgets

```js
import {
  // Layout
  Column, Row, Container, Center, Align, Padding, SizedBox,
  Flexible, Expanded, Spacer, Wrap, Stack, Positioned,
  Divider, Card, AspectRatio, Transform,

  // Text
  Text, Heading, Caption, RichText,

  // Controls
  Button, Input, TextField, Checkbox, Switch,

  // Display
  Icon, Image, CircleAvatar, Badge,

  // Scrolling
  ListView, GridView, SingleChildScrollView,

  // Feedback
  Dialog, AlertDialog, SnackBar, Tooltip,
  LinearProgressIndicator, CircularProgressIndicator,

  // Forms
  Form, FormField, RadioGroup, Slider, Dropdown, TextArea,

  // Navigation
  Scaffold, AppBar, TabBar, TabBarView, BottomNavigationBar,

  // Animation
  AnimatedContainer, AnimatedOpacity, AnimatedScale,

  // State
  useState, createStore,
} from "@chimuka_amel/lumina-ui";
```

---

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy it anywhere that serves static files — Vercel, Netlify, Cloudflare Pages, GitHub Pages, an S3 bucket.

```bash
# Preview the production build locally
npm run preview
```

### GitHub Pages

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
npm install --save-dev gh-pages
npm run deploy
```

---

## package.json

```json
{
  "name": "my-lumina-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@chimuka_amel/lumina-ui": "latest"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

## Troubleshooting

**"Cannot find module '@chimuka_amel/lumina-ui'"**
```bash
npm install @chimuka_amel/lumina-ui
```

**HMR not picking up changes**

State updates trigger `forceUpdate()` so HMR works out of the box. If something feels off, just restart the dev server.

**Build output too large?**

LuminaUI is around 150 KB. Vite minifies and treeshakes automatically. Run `npm run build -- --report` to inspect the bundle.

---

## License

MIT
