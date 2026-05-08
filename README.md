Here's your **detailed README.md** focused on using LuminaUI with Vite:

---

```markdown
# LuminaUI + Vite

A complete starter template for building apps with LuminaUI and Vite. Zero configuration, instant hot reload, and a full component library ready to use.

## Quick Start

Create a new project in one command:

```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install @chimuka_amel/lumina-ui
```

Replace the boilerplate files with the examples below, then:

```bash
npm run dev
```

Open `http://localhost:5173` — your LuminaUI app is running.

---

## Project Structure

```text
my-app/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   └── style.css
└── node_modules/
```

That's it. No extra config files. No bundler setup. Vite just works.

---

## The Minimal Setup

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LuminaUI + Vite</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: system-ui, -apple-system, Inter, sans-serif;
        background: #f5f7fa;
      }
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

### Run it

```bash
npm run dev
```

---

## Complete Example

A more realistic app with forms, cards, and state management.

### `src/main.js`

```js
import {
  mount,
  Column,
  Row,
  Container,
  Text,
  Button,
  Card,
  TextField,
  Heading,
  Divider,
  useState,
} from "@chimuka_amel/lumina-ui";

// State
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
            text: "Start Over",
            variant: "secondary",
            onClick: () => {
              setName("");
              setEmail("");
              setSubmitted(false);
            },
          }),
        ]),
      ]),
    ]);
  }

  return Container({ style: { minHeight: "100vh" }, padding: 48 }, [
    Card({ padding: 32, elevation: 2 }, [
      Column({ gap: 24, style: { maxWidth: 480, margin: "0 auto" } }, [
        Heading({ level: 1 }, "LuminaUI + Vite"),
        Text("A complete UI framework with zero dependencies", {
          color: "#6b7280",
        }),
        Divider(),
        Column({ gap: 16 }, [
          TextField({
            placeholder: "Your name",
            value: name(),
            onChange: setName,
          }),
          TextField({
            placeholder: "Your email",
            type: "email",
            value: email(),
            onChange: setEmail,
          }),
          Button({
            text: "Submit",
            onClick: () => setSubmitted(true),
            variant: "primary",
          }),
        ]),
      ]),
    ]),
  ]);
}

mount(App, document.getElementById("app"));
```

---

## Building for Production

```bash
npm run build
```

Vite outputs optimized static files to the `dist/` folder:

```text
dist/
├── index.html
└── assets/
    ├── index-abc123.js
    └── index-def456.css
```

Deploy the `dist/` folder to any static host:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any S3 bucket

```bash
# Preview the build locally
npm run preview
```

---

## Using More Widgets

Import any widget from the LuminaUI package:

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

## Example: Todo App

```js
// src/todo.js
import { mount, Column, Row, Text, Button, TextField, Card, useState } from "@chimuka_amel/lumina-ui";

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

  const addTodo = () => {
    if (input().trim()) {
      setTodos([...todos(), { id: Date.now(), text: input(), done: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos().map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return Column({ gap: 16, style: { padding: 48, maxWidth: 600, margin: "0 auto" } }, [
    Text("Todos", { size: 32, weight: 900 }),
    Row({ gap: 8 }, [
      TextField({
        placeholder: "Add a todo...",
        value: input(),
        onChange: setInput,
        style: { flex: 1 },
      }),
      Button({ text: "Add", onClick: addTodo, variant: "primary" }),
    ]),
    Column({ gap: 8 }, [
      ...todos().map((todo) =>
        Row(
          { key: todo.id, gap: 8, style: { alignItems: "center" } },
          [
            Button({
              text: todo.done ? "✓" : "○",
              onClick: () => toggleTodo(todo.id),
              variant: "text",
              style: { width: 40 },
            }),
            Text(todo.text, {
              style: todo.done ? { textDecoration: "line-through", color: "#9ca3af" } : {},
            }),
          ]
        )
      ),
    ]),
  ]);
}

mount(App, document.getElementById("app"));
```

---

## Why Vite + LuminaUI?

| Feature | What you get |
|---------|--------------|
| **Dev server** | Instant start, fast HMR |
| **Build** | Optimized production bundles |
| **No config** | Zero setup, just works |
| **No dependencies** | LuminaUI brings zero, Vite brings tooling only |
| **Deploy anywhere** | Static files, any host |
| **ES modules** | Modern browser-native imports |

---

## Troubleshooting

### "Cannot find module '@chimuka_amel/lumina-ui'"

Make sure you installed it:

```bash
npm install @chimuka_amel/lumina-ui
```

### Hot reload not working

Vite's HMR works with LuminaUI because state updates trigger `forceUpdate()`. If something feels off, restart the dev server:

```bash
npm run dev
```

### Build size too large?

LuminaUI itself is tiny (~150 KB). Vite's build minifies and treeshakes. Check the build report:

```bash
npm run build -- --report
```

---

## Deploy to Production

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

### GitHub Pages

```json
// package.json
{
  "homepage": "https://yourusername.github.io/my-app",
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

## Full Package.json Example

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

## Learn More

- [Vite Documentation](https://vitejs.dev)
- [LuminaUI Widget Reference](#) (link to your full README)

---

## License

MIT

---

**Zero dependencies. Instant development. Pure JavaScript.** 🚀
```

---

This README is **production-ready** and covers:

- Quick start with Vite
- Minimal and complete examples
- Building and deploying
- Todo app example
- Troubleshooting
- Deployment guides
- Package.json example

Just drop this into your Vite project as `README.md` and you're good to go.