# LuminaUI Documentation

Professional package documentation for `@neuralumina/lumina-ui`.

Current documented package version: `0.2.0`

LuminaUI is a lightweight, Flutter-inspired UI package for building browser
interfaces with plain JavaScript, ES modules, and real DOM output. This Vite
site documents the npm package itself: installation, mental model, state,
imports, deployment, and the complete public widget surface.

## Install

```bash
npm install @neuralumina/lumina-ui@latest
```

For this project, the installed package resolves to:

```json
{
  "dependencies": {
    "@neuralumina/lumina-ui": "^0.2.0"
  }
}
```

## Quick Start

```js
import { mount, Column, Text, Button } from "@neuralumina/lumina-ui";

function App() {
  return Column({ gap: 12, padding: 16 }, [
    Text("Hello from LuminaUI", { as: "h1", size: 28, weight: 900 }),
    Button({
      text: "Click me",
      onClick: () => console.log("clicked"),
    }),
  ]);
}

mount(App, document.getElementById("app"));
```

## State Model

`useState` returns `[get, set, subscribe]`. Subscribe the renderer
`forceUpdate` function once, then read state through getters during render.

```js
import { mount, useState, Column, Row, Text, Button } from "@neuralumina/lumina-ui";

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
    Text(`Count: ${count()}`, { weight: 900 }),
    Row({ gap: 8 }, [
      Button({ text: "-", onClick: () => setCount((value) => value - 1) }),
      Button({ text: "+", onClick: () => setCount((value) => value + 1) }),
    ]),
  ]);
}

mount(App, document.getElementById("app"));
```

## Import Paths

Use the top-level package entry for most applications.

```js
import {
  mount,
  useState,
  Column,
  Row,
  Text,
  Button,
} from "@neuralumina/lumina-ui";
```

Subpath imports are also available when you want explicit module boundaries.

```js
import { Column, Row } from "@neuralumina/lumina-ui/widgets/layout";
import { Button } from "@neuralumina/lumina-ui/widgets/controls";
import { createStore } from "@neuralumina/lumina-ui/core/state";
```

## Core Exports

- `mount`
- `useState`
- `useEffect`
- `createStore`
- `createElement`
- `Fragment`
- `applyStyles`
- `addClasses`
- `errorBus`
- `createTheme`
- `luminaTheme`
- `luminaDefaultTheme`
- `themeToCssVariables`
- `GlobalTheme`
- `ThemeProvider`
- `ThemeScope`

## Full Widget Inventory

The package currently documents 120 public widgets.

### Layout

`Column`, `Row`, `Container`, `Center`, `Align`, `Expanded`, `Flexible`,
`Padding`, `SizedBox`, `Spacer`, `Wrap`, `Stack`, `Positioned`, `Divider`,
`Card`, `AspectRatio`, `Baseline`, `ConstrainedBox`, `DecoratedBox`,
`FractionallySizedBox`, `LayoutBuilder`, `LimitedBox`, `Offstage`,
`OverflowBox`, `RotatedBox`, `SizedOverflowBox`, `Transform`

### Controls

`Button`, `Input`, `TextField`, `Checkbox`, `Switch`

### Display

`Badge`, `CircleAvatar`, `ClipRRect`, `Icon`, `Image`, `Placeholder`,
`ClipOval`, `ClipPath`, `ClipRect`, `FittedBox`, `Opacity`, `PhysicalModel`,
`ShaderMask`

### Scrolling

`CustomScrollView`, `GridView`, `ListView`, `NestedScrollView`, `PageView`,
`SingleChildScrollView`, `SliverAppBar`, `SliverGrid`, `SliverList`,
`SliverPadding`, `SliverToBoxAdapter`

### Feedback

`AlertDialog`, `CircularProgressIndicator`, `Dialog`,
`LinearProgressIndicator`, `ModalBarrier`, `SnackBar`, `Tooltip`

### Forms

`Dropdown`, `Form`, `FormField`, `Radio`, `RadioGroup`, `Slider`, `TextArea`

### Navigation

`AppBar`, `BottomNavigationBar`, `Drawer`, `NavigationRail`, `Scaffold`,
`TabBar`, `TabBarView`

### Animation

`AnimatedContainer`, `AnimatedOpacity`, `AnimatedScale`, `AnimatedSlide`,
`AnimatedSwitcher`

### Text

`Text`, `Heading`, `Caption`, `DefaultTextStyle`, `RichText`

### Accessibility

`Semantics`, `ExcludeSemantics`

### Interaction

`AbsorbPointer`, `Dismissible`, `Draggable`, `DragTarget`, `GestureDetector`,
`IgnorePointer`

### Routing

`Router`, `RouteView`, `Link`, `NavLink`, `createRouter`, `defaultRouter`,
`isRouteActive`, `matchPath`, `matchRoute`

### Overlays

`Overlay`, `OverlayEntry`, `Popover`, `Menu`, `MenuItem`, `MenuDivider`,
`PopupMenuButton`

### Data

`DataTable`, `Pagination`, `paginationRange`, `sortRows`

### Selection

`ComboBox`, `Autocomplete`, `AutoComplete`, `filterOptions`

### DevTools

`DevTools`

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

Vite writes static production output to `dist/`. The generated files can be
deployed to any static host.

## Documentation Features

- Reads the package version from `@neuralumina/lumina-ui/package.json`.
- Documents every public widget exported by the current package.
- Lists nested navigation subitems for sections, widget groups, and individual widgets.
- Provides syntax-highlighted JavaScript, Bash, and JSON snippets in the app.
- Uses responsive grids, a small-device navigation drawer, and horizontally
  scrollable code blocks for smaller screens.
- Injects global CSS reset (box-sizing, antialiasing, selection styles) on package import via `ensureGlobalStyle`.
- Captures render, state, effect, event, and unhandled errors through the `ErrorBus` singleton.
- Includes a `DevTools` widget for runtime error inspection with stack traces.

## License

This project is licensed under the [Apache License 2.0](./LICENSE). The
documented package, `@neuralumina/lumina-ui`, is also licensed as `Apache-2.0`.
