import "./style.css";
import packageInfo from "@neuralumina/lumina-ui/package.json";
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
} from "@neuralumina/lumina-ui";

const [activeSection, setActiveSection, subscribeActiveSection] =
  useState("overview");
const [activeTarget, setActiveTarget, subscribeActiveTarget] =
  useState("overview");
const [drawerOpen, setDrawerOpen, subscribeDrawerOpen] = useState(false);
const [searchTerm, setSearchTerm, subscribeSearchTerm] = useState("");
const [toast, setToast, subscribeToast] = useState(null);
const subscribedUpdates = new WeakSet();

const packageName = packageInfo.name;
const packageVersion = packageInfo.version;
const packageLicense = packageInfo.license || "Open source";

const baseNavItems = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "tutorial", label: "Tutorial" },
  { id: "mental-model", label: "Mental Model" },
  { id: "state", label: "State" },
  { id: "widgets", label: "Widgets" },
  { id: "responsive", label: "Responsive" },
  { id: "imports", label: "Imports" },
  { id: "examples", label: "Examples" },
  { id: "patterns", label: "Patterns" },
  { id: "deployment", label: "Deployment" },
];

const highlights = [
  {
    title: "Widget-tree JavaScript",
    body: "Compose interfaces with functions that return small virtual node objects. No JSX transform is required.",
  },
  {
    title: "Browser DOM renderer",
    body: "mount() renders real DOM nodes and patches updates from the latest widget tree.",
  },
  {
    title: "Explicit state",
    body: "useState returns a getter, setter, and subscriber so state updates stay visible and predictable.",
  },
  {
    title: "Package-first API",
    body: "The top-level module exports core utilities, theme helpers, and every public widget family.",
  },
  {
    title: "Responsive by default",
    body: "Widgets adapt from small phones to desktop screens with fluid sizing, safe-area awareness, and touch-friendly targets — no extra CSS required.",
  },
];

function w(name, description, props) {
  return { name, description, props };
}

const widgetGroups = [
  {
    id: "layout",
    title: "Layout",
    importPath: "@neuralumina/lumina-ui/widgets/layout",
    summary:
      "Structure responsive screens with flex, box, constraint, stack, and transform primitives.",
    example: `import { Column, Row, Card, Text, Button } from "@neuralumina/lumina-ui";

Column({ gap: 16, padding: 24 }, [
  Row({ mainAxisAlignment: "spaceBetween", gap: 12 }, [
    Text("Release dashboard", { weight: 900, size: 20 }),
    Button({ text: "Ship" }),
  ]),
  Card({ padding: 16, elevation: 2 }, [
    Text("Layout widgets are plain JavaScript calls."),
  ]),
]);`,
    widgets: [
      w("Column", "Vertical flex container for stacked UI.", "gap, padding, mainAxisAlignment, crossAxisAlignment"),
      w("Row", "Horizontal flex container for toolbars and inline content.", "gap, padding, mainAxisAlignment, crossAxisAlignment"),
      w("Container", "General-purpose box for sizing, spacing, decoration, and alignment.", "width, height, padding, margin, color, decoration"),
      w("Center", "Centers child content in both axes.", "width, height, style"),
      w("Align", "Aligns children within a flexible box.", "alignment, widthFactor, heightFactor"),
      w("Expanded", "Takes remaining flex space with tight fit.", "flex, style"),
      w("Flexible", "Controls how a child participates in a Row or Column.", "flex, fit"),
      w("Padding", "Applies edge insets around children.", "padding"),
      w("SizedBox", "Creates fixed or flexible empty space and size wrappers.", "width, height"),
      w("Spacer", "Consumes remaining flex space between siblings.", "flex"),
      w("Wrap", "Wraps children across lines when space runs out.", "gap, spacing, direction, alignment"),
      w("Stack", "Positions layered children relative to a parent.", "width, height, clip"),
      w("Positioned", "Places a child absolutely inside Stack.", "top, right, bottom, left, width, height"),
      w("Divider", "Horizontal or vertical visual separator.", "direction, thickness, color, margin"),
      w("Card", "Raised surface with border, radius, padding, and elevation.", "padding, radius, elevation, decoration"),
      w("AspectRatio", "Maintains a width-to-height ratio.", "aspectRatio, ratio, width"),
      w("Baseline", "Aligns inline content to a baseline.", "baseline, baselineType"),
      w("ConstrainedBox", "Applies min and max size constraints.", "constraints, minWidth, maxWidth, minHeight, maxHeight"),
      w("DecoratedBox", "Applies a decoration object to a box.", "decoration"),
      w("FractionallySizedBox", "Sizes itself by a fraction of available space.", "widthFactor, heightFactor, alignment"),
      w("LayoutBuilder", "Builds children from supplied constraints.", "builder, constraints, child"),
      w("LimitedBox", "Caps maximum width or height.", "maxWidth, maxHeight"),
      w("Offstage", "Keeps children in the tree while hiding them visually.", "offstage"),
      w("OverflowBox", "Allows child content to overflow its bounds.", "minWidth, maxWidth, minHeight, maxHeight"),
      w("RotatedBox", "Rotates content in quarter turns.", "quarterTurns"),
      w("SizedOverflowBox", "Combines fixed sizing with visible overflow.", "size, width, height"),
      w("Transform", "Applies CSS translate, rotate, scale, skew, or custom transform.", "translate, rotate, scale, skew, transform, origin"),
    ],
  },
  {
    id: "controls",
    title: "Controls",
    importPath: "@neuralumina/lumina-ui/widgets/controls",
    summary:
      "Collect intent with accessible buttons, text input primitives, checkboxes, and switches.",
    example: `import { Row, Button, TextField, Switch } from "@neuralumina/lumina-ui";

Row({ gap: 12, style: { flexWrap: "wrap" } }, [
  TextField({ placeholder: "Project name", onChange: setName }),
  Switch({ value: enabled(), onChange: setEnabled, ariaLabel: "Enable sync" }),
  Button({ text: "Save", onClick: saveProject }),
]);`,
    widgets: [
      w("Button", "Styled action button with primary, secondary, text, and danger variants.", "text, onClick, variant, disabled, type"),
      w("Input", "Base input control for text, checkbox, and other native input types.", "value, onChange, onInput, placeholder, type"),
      w("TextField", "Convenience wrapper around Input for text entry.", "value, onChange, placeholder, type"),
      w("Checkbox", "Labelled boolean input.", "checked, onChange, label, disabled"),
      w("Switch", "Accessible on/off toggle button.", "value, onChange, ariaLabel, disabled"),
    ],
  },
  {
    id: "display",
    title: "Display",
    importPath: "@neuralumina/lumina-ui/widgets/display",
    summary:
      "Present media, status, clipping, fitting, opacity, elevation, and lightweight icon content.",
    example: `import { Row, CircleAvatar, Badge, Icon, Text } from "@neuralumina/lumina-ui";

Row({ gap: 12 }, [
  Badge({ label: 3 }, [
    CircleAvatar({ initials: "NL", size: 44 }),
  ]),
  Icon("info", { label: "Info", color: "#0f8f67" }),
  Text("Display widgets shape visual content."),
]);`,
    widgets: [
      w("Badge", "Places a count or status marker over child content.", "label, color, textColor, alignment"),
      w("CircleAvatar", "Circular avatar from an image, initials, or children.", "src, alt, initials, size"),
      w("ClipRRect", "Clips children with rounded rectangular bounds.", "radius"),
      w("Icon", "Small text-backed icon primitive.", "name, label, size, color"),
      w("Image", "Responsive image element with fit, radius, size, and alt text.", "src, alt, width, height, fit, radius"),
      w("Placeholder", "Dashed placeholder area for empty media states.", "width, height, color, label"),
      w("ClipOval", "Clips children into an oval or circle.", "style"),
      w("ClipPath", "Clips children with a CSS clip-path value.", "path, clipPath"),
      w("ClipRect", "Clips overflowing child content to a rectangle.", "style"),
      w("FittedBox", "Fits child media within a bounded area.", "fit, width, height, alignment"),
      w("Opacity", "Applies opacity to a subtree.", "opacity"),
      w("PhysicalModel", "Creates a material-like surface with elevation and shadow.", "elevation, color, shadowColor, borderRadius"),
      w("ShaderMask", "Applies background shader effects, including text masks.", "shader, blendMode"),
    ],
  },
  {
    id: "scrolling",
    title: "Scrolling",
    importPath: "@neuralumina/lumina-ui/widgets/scrolling",
    summary:
      "Build list, grid, page, nested, and sliver-like scrolling layouts with data builders.",
    example: `import { GridView, Card, Text } from "@neuralumina/lumina-ui";

GridView({
  items: products,
  minColumnWidth: 180,
  gap: 12,
  itemBuilder: (product) =>
    Card({ key: product.id }, [Text(product.name, { weight: 800 })]),
});`,
    widgets: [
      w("CustomScrollView", "Scrollable container for sliver-like child sections.", "slivers, direction, padding, smooth"),
      w("GridView", "Responsive grid built from children or itemBuilder.", "items, itemBuilder, columns, minColumnWidth, gap"),
      w("ListView", "Vertical or horizontal list built from children or items.", "items, itemBuilder, separatorBuilder, direction, gap"),
      w("NestedScrollView", "Scrollable layout with separate header and body slots.", "header, body"),
      w("PageView", "Snap-scrolling page container.", "pages, direction, gap"),
      w("SingleChildScrollView", "Scrollable wrapper for a single child tree.", "scrollDirection, direction, padding, maxHeight"),
      w("SliverAppBar", "Sticky or floating header for custom scroll layouts.", "title, expandedHeight, floating, pinned"),
      w("SliverGrid", "GridView alias for sliver-style composition.", "items, itemBuilder, columns, gap"),
      w("SliverList", "ListView alias for sliver-style composition.", "items, itemBuilder, separatorBuilder"),
      w("SliverPadding", "Padding wrapper for sliver-style children.", "padding"),
      w("SliverToBoxAdapter", "Adapts a normal box into a sliver-style child.", "children, style"),
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    importPath: "@neuralumina/lumina-ui/widgets/feedback",
    summary:
      "Communicate status, blocking decisions, and progress with dialogs, snackbars, and indicators.",
    example: `import { SnackBar, Button } from "@neuralumina/lumina-ui";

SnackBar({
  open: saved(),
  message: "Changes saved",
  action: Button({ text: "Undo", variant: "text", onClick: undo }),
});`,
    widgets: [
      w("AlertDialog", "Preset modal dialog with title, content, and actions.", "open, title, content, actions, onDismiss"),
      w("CircularProgressIndicator", "Circular loading indicator.", "size, strokeWidth, color, trackColor"),
      w("Dialog", "Modal shell with overlay, dismiss behavior, and width control.", "open, dismissible, onDismiss, width, barrierColor"),
      w("LinearProgressIndicator", "Determinate or indeterminate progress bar.", "value, color, trackColor, height"),
      w("ModalBarrier", "Dismissible or static overlay layer.", "color, dismissible, onDismiss, zIndex"),
      w("SnackBar", "Fixed status message with optional action.", "open, message, action, position"),
      w("Tooltip", "Native title-backed tooltip wrapper.", "message"),
    ],
  },
  {
    id: "forms",
    title: "Forms",
    importPath: "@neuralumina/lumina-ui/widgets/forms",
    summary:
      "Compose validated form flows from labels, radios, sliders, selects, and text areas.",
    example: `import { Form, FormField, TextArea, Dropdown, Button } from "@neuralumina/lumina-ui";

Form({ onSubmit: submitProfile, gap: 16 }, [
  FormField({ label: "Bio", helperText: "Keep it short." }, [
    TextArea({ value: bio(), onChange: setBio }),
  ]),
  Dropdown({ value: role(), onChange: setRole, options: roleOptions }),
  Button({ text: "Create profile", type: "submit" }),
]);`,
    widgets: [
      w("Dropdown", "Select menu with options and placeholder support.", "value, options, onChange, placeholder, disabled"),
      w("Form", "Submit-safe form wrapper with vertical layout.", "onSubmit, gap, noValidate"),
      w("FormField", "Label, required marker, helper text, and error text wrapper.", "label, helperText, errorText, required"),
      w("Radio", "Single radio option for custom groups.", "value, groupValue, onChange, label, name"),
      w("RadioGroup", "Managed group of Radio options.", "options, value, onChange, name, direction, gap"),
      w("Slider", "Native range input returning numeric values.", "value, min, max, step, onChange"),
      w("TextArea", "Multi-line text entry with LuminaUI field styling.", "value, onChange, rows, placeholder"),
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    importPath: "@neuralumina/lumina-ui/widgets/navigation",
    summary:
      "Create app shells, top bars, drawers, rails, tab sets, and bottom navigation.",
    example: `import { Scaffold, AppBar, Column, TabBar, TabBarView } from "@neuralumina/lumina-ui";

Scaffold({
  appBar: AppBar({ title: "LuminaUI" }),
  body: Column([
    TabBar({ tabs, value: activeTab(), onChange: setActiveTab }),
    TabBarView({ tabs, value: activeTab() }),
  ]),
});`,
    widgets: [
      w("AppBar", "Header bar with title, leading content, and actions.", "title, leading, actions, height"),
      w("BottomNavigationBar", "Mobile-style bottom navigation grid with safe-area inset padding.", "items, value, onChange, color"),
      w("Drawer", "Fixed side drawer for app navigation.", "open, width, zIndex"),
      w("NavigationRail", "Vertical side navigation for desktop app shells.", "items, value, onChange, width"),
      w("Scaffold", "Application layout shell with appBar, body, drawer, and bottomNavigationBar.", "appBar, body, drawer, bottomNavigationBar, bodyStyle"),
      w("TabBar", "Controlled tab list that scrolls horizontally when tabs overflow.", "tabs, value, onChange, color"),
      w("TabBarView", "Renders the active tab child.", "tabs, value"),
    ],
  },
  {
    id: "animation",
    title: "Animation",
    importPath: "@neuralumina/lumina-ui/widgets/animation",
    summary:
      "Add CSS-transition driven motion for container, opacity, scale, slide, and switcher states.",
    example: `import { AnimatedOpacity, AnimatedScale, Text } from "@neuralumina/lumina-ui";

AnimatedScale({ scale: selected() ? 1.04 : 1, duration: 180 }, [
  AnimatedOpacity({ opacity: selected() ? 1 : 0.64 }, [
    Text("Animated widgets use CSS transitions."),
  ]),
]);`,
    widgets: [
      w("AnimatedContainer", "Animates size and style changes.", "duration, curve, transition, width, height"),
      w("AnimatedOpacity", "Animates opacity changes.", "opacity, duration, curve"),
      w("AnimatedScale", "Animates CSS scale changes.", "scale, duration, curve, origin"),
      w("AnimatedSlide", "Animates translate offsets.", "offset, duration, curve"),
      w("AnimatedSwitcher", "Transition wrapper for replacing a child.", "child, duration, curve"),
    ],
  },
  {
    id: "text",
    title: "Text",
    importPath: "@neuralumina/lumina-ui/widgets/text",
    summary:
      "Render semantic headings, body text, captions, inherited text styling, and rich spans.",
    example: `import { Heading, Text, Caption, RichText } from "@neuralumina/lumina-ui";

Column({ gap: 8 }, [
  Heading({ level: 2 }, "Documentation"),
  Text("Readable defaults with semantic escape hatches."),
  Caption({}, "Versioned API reference"),
  RichText({ spans: [{ text: "Rich", style: { fontWeight: 900 } }, { text: " text" }] }),
]);`,
    widgets: [
      w("Text", "Typography primitive with semantic tag support.", "content, size, weight, align, color, lineHeight, maxLines, as"),
      w("Heading", "Heading helper for h1 through h6 with fluid, viewport-scaled sizing.", "level, size, children"),
      w("Caption", "Small muted text helper.", "children, color, size"),
      w("DefaultTextStyle", "Applies inherited text styles to a subtree.", "size, weight, color, align, lineHeight"),
      w("RichText", "Renders styled spans inside one text container.", "spans, as, style"),
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    importPath: "@neuralumina/lumina-ui/widgets/accessibility",
    summary:
      "Attach semantic roles, labels, descriptions, live regions, and hidden semantics intentionally.",
    example: `import { Semantics, ExcludeSemantics, Text } from "@neuralumina/lumina-ui";

Semantics({ role: "status", label: "Sync state", liveRegion: true }, [
  Text("All changes synced"),
  ExcludeSemantics([Text("Decorative timestamp")]),
]);`,
    widgets: [
      w("Semantics", "Adds role, label, description, hidden, and live region attributes.", "as, role, label, hint, hidden, liveRegion"),
      w("ExcludeSemantics", "Hides decorative children from assistive technology.", "children, style"),
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    importPath: "@neuralumina/lumina-ui/widgets/interaction",
    summary:
      "Handle gestures, drag and drop, pointer blocking, and dismissible UI regions.",
    example: `import { GestureDetector, Dismissible, Card, Text } from "@neuralumina/lumina-ui";

Dismissible({ onDismissed: archiveCard }, [
  GestureDetector({ onTap: openCard, onLongPress: pinCard }, [
    Card([Text("Tap, long press, or dismiss")]),
  ]),
]);`,
    widgets: [
      w("AbsorbPointer", "Blocks pointer events while optionally dimming children.", "absorbing, cursor, dim"),
      w("Dismissible", "Detects swipe or keyboard dismissal once movement passes the threshold.", "direction, onDismissed, threshold, radius"),
      w("Draggable", "Makes children draggable with optional transfer data.", "data, onDragStarted, onDragCompleted, width, height"),
      w("DragTarget", "Receives dragged data and controls acceptable drops.", "onAccept, onWillAccept, radius"),
      w("GestureDetector", "Maps tap, double tap, long press, and drag-based pan events. Long press tolerates small touch jitter.", "onTap, onDoubleTap, onLongPress, onPanStart, onPanUpdate, onPanEnd, longPressDelay"),
      w("IgnorePointer", "Lets pointer events pass through a subtree.", "ignoring"),
    ],
  },
  {
    id: "routing",
    title: "Routing",
    importPath: "@neuralumina/lumina-ui/widgets/routing",
    summary:
      "Lightweight browser-history routing with parameter matching, navigation links, and route views.",
    example: `import { createRouter, Router, RouteView, Link, NavLink, Column, Row, Text } from "@neuralumina/lumina-ui";

const router = createRouter({
  routes: [
    { path: "/", child: Text("Home") },
    { path: "/products/:id", component: ({ params }) => Text("Product " + params.id) },
    { path: "*", child: Text("Not found") },
  ],
});

Column({ gap: 12 }, [
  Row({ gap: 8 }, [
    NavLink({ router, to: "/", label: "Home", exact: true }),
    Link({ router, to: "/products/42", label: "Product" }),
  ]),
  Router({ router }),
]);`,
    widgets: [
      w("Router", "Renders the matched route component.", "router"),
      w("RouteView", "Alternative route renderer with transition support.", "router, transition"),
      w("Link", "Anchor tag that navigates via the router.", "router, to, label"),
      w("NavLink", "Link that highlights when its path is active.", "router, to, label, exact"),
      w("createRouter", "Creates a router instance with route definitions.", "routes, notFound"),
      w("defaultRouter", "Pre-initialized singleton router.", "routes"),
      w("isRouteActive", "Checks if a given path matches the current location.", "router, path, exact"),
      w("matchPath", "Matches a pathname against a route pattern.", "pattern, pathname"),
      w("matchRoute", "Finds the first matching route in a routes array.", "pathname, routes"),
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    importPath: "@neuralumina/lumina-ui/widgets/overlay",
    summary:
      "Controlled overlay, popover, and menu widgets for dialogs, dropdowns, and anchored menus.",
    example: `import { Overlay, PopupMenuButton, Popover, Padding, Column, Text, Heading } from "@neuralumina/lumina-ui";

Overlay({ open: isOpen(), modal: true, onDismiss: close }, [
  Padding({ padding: 20 }, [
    Column({ gap: 12 }, [
      Heading({ level: 3 }, "Quick action"),
      Text("This content sits above a scrim."),
    ]),
  ]),
]);`,
    widgets: [
      w("Overlay", "Renders children in a portal with optional modal scrim.", "open, modal, onDismiss, style"),
      w("OverlayEntry", "Insert element directly into the overlay portal.", "child"),
      w("Popover", "Anchored popover that opens relative to a trigger element.", "open, anchor, onDismiss, children"),
      w("Menu", "Vertical list of menu items in a floating panel.", "open, onDismiss, children"),
      w("MenuItem", "Individual clickable item inside a Menu.", "label, onClick, danger"),
      w("MenuDivider", "Horizontal separator used inside menus.", ""),
      w("PopupMenuButton", "Button that toggles a controlled anchored menu.", "open, onOpenChange, label, items, onSelect"),
    ],
  },
  {
    id: "data",
    title: "Data",
    importPath: "@neuralumina/lumina-ui/widgets/data",
    summary:
      "Tabular data display and pagination controls for structured datasets.",
    example: `import { DataTable, Pagination, Column, Text } from "@neuralumina/lumina-ui";

DataTable({
  rows: products(),
  sortBy: sortKey(),
  sortDirection: sortDir(),
  onSortChange: (key, dir) => { setSortKey(key); setSortDir(dir); },
  columns: [
    { key: "name", label: "Product", sortable: true },
    { key: "stock", label: "Stock", align: "right" },
  ],
});`,
    widgets: [
      w("DataTable", "Renders a sortable table from rows and column definitions.", "rows, columns, sortBy, sortDirection, onSortChange"),
      w("Pagination", "Page navigation control with page number display.", "page, pageSize, totalItems, onPageChange"),
      w("paginationRange", "Utility that computes visible page numbers.", "current, total, siblings"),
      w("sortRows", "Utility that sorts rows by key and direction.", "rows, key, direction"),
    ],
  },
  {
    id: "selection",
    title: "Selection",
    importPath: "@neuralumina/lumina-ui/widgets/selection",
    summary:
      "Combo box and autocomplete widgets for text input with option selection.",
    example: `import { ComboBox, Autocomplete, Column } from "@neuralumina/lumina-ui";

ComboBox({
  value: city(),
  inputValue: query(),
  open: comboOpen(),
  onInputChange: setQuery,
  onOpenChange: setComboOpen,
  onChange: (val, opt) => { setCity(val); setQuery(opt.label); },
  options: [
    { label: "Lusaka", value: "lusaka" },
    { label: "Cape Town", value: "cape-town" },
  ],
});`,
    widgets: [
      w("ComboBox", "Controlled text input with a listbox of selectable options.", "value, inputValue, open, onInputChange, onOpenChange, onChange, options"),
      w("Autocomplete", "ComboBox that filters options by input value.", "inputValue, onInputChange, onChange, options"),
      w("AutoComplete", "Alias for Autocomplete.", "inputValue, onInputChange, onChange, options"),
      w("filterOptions", "Utility that filters option list by a query string.", "options, query"),
    ],
  },
  {
    id: "devtools",
    title: "DevTools",
    importPath: "@neuralumina/lumina-ui/widgets/devtools",
    summary:
      "Runtime error inspection overlay that captures render, state, effect, event, and unhandled errors.",
    example: `import { DevTools } from "@neuralumina/lumina-ui/widgets/devtools";
import { errorBus } from "@neuralumina/lumina-ui";

DevTools({ open: devToolsOpen(), onOpenChange: setDevToolsOpen, maxErrors: 50 });

// Programmatic access:
errorBus.subscribe((entry) => console.log(entry));
errorBus.clear();
errorBus.getEntries();`,
    widgets: [
      w("DevTools", "Floating error inspection panel with count badge and expandable stack traces.", "open, onOpenChange, maxErrors"),
    ],
  },
];

const coreApis = [
  w("mount", "Mounts a component function or widget tree into a DOM container.", "componentFn, container"),
  w("useState", "Alias of createState that returns [get, set, subscribe].", "initialValue"),
  w("useEffect", "Creates an effect runner that can compare dependencies.", "effect, deps"),
  w("createStore", "Tiny reducer store with getState, dispatch, and subscribe.", "reducer, initialState"),
  w("createElement", "Low-level DOM element factory used by the renderer.", "tag, props"),
  w("Fragment", "Creates a document fragment from children.", "children"),
  w("applyStyles", "Applies a style object to an existing DOM element.", "element, styles"),
  w("addClasses", "Adds one or more class names to an existing DOM element.", "element, ...classes"),
  w("luminaTheme", "CSS-variable-backed design tokens for colors, radius, shadow, and transition.", "colors, radius, shadow, transition"),
  w("luminaDefaultTheme", "Raw default token values before CSS variable wrapping.", "colors, radius, shadow, transition"),
  w("createTheme", "Merges overrides with the default theme to produce a custom token set.", "overrides"),
  w("themeToCssVariables", "Converts a theme object into CSS custom property declarations.", "theme"),
  w("GlobalTheme", "Applies theme tokens as CSS custom properties on :root.", "theme"),
  w("ThemeProvider", "Wraps children with theme token application in a scoped container.", "theme, applySurface, children"),
  w("ThemeScope", "Alias for ThemeProvider.", "theme"),
  w("errorBus", "ErrorBus singleton that captures render, state, effect, event, and unhandled errors.", "capture, subscribe, clear, getEntries"),
];

const totalWidgets = widgetGroups.reduce(
  (sum, group) => sum + group.widgets.length,
  0,
);

function slugify(value) {
  return String(value)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function groupAnchor(group) {
  return `widget-group-${group.id}`;
}

function widgetAnchor(group, widget) {
  return `widget-${group.id}-${slugify(widget.name)}`;
}

function apiAnchor(api) {
  return `api-${slugify(api.name)}`;
}

function widgetNavChildren(group) {
  return group.widgets.map((widget) => ({
    id: widgetAnchor(group, widget),
    label: widget.name,
    sectionId: "widgets",
  }));
}

const navItems = baseNavItems.map((item) => {
  const children = {
    overview: [
      { id: "overview", label: `Package v${packageVersion}` },
      { id: "widgets", label: `${totalWidgets} widgets`, sectionId: "widgets" },
      { id: "state", label: "Core APIs", sectionId: "state" },
    ],
    installation: [
      { id: "installation", label: "npm install" },
      { id: "imports", label: "Package imports", sectionId: "imports" },
      { id: "deployment", label: "Vite build", sectionId: "deployment" },
    ],
    "quick-start": [
      { id: "quick-start", label: "mount" },
      { id: "widget-layout-column", label: "Column widget", sectionId: "widgets" },
      { id: "widget-controls-button", label: "Button widget", sectionId: "widgets" },
    ],
    tutorial: [
      { id: "tutorial-step-1", label: "Step 1 — Hello World", sectionId: "tutorial" },
      { id: "tutorial-step-2", label: "Step 2 — State", sectionId: "tutorial" },
      { id: "tutorial-step-3", label: "Step 3 — Input & Lists", sectionId: "tutorial" },
      { id: "tutorial-step-4", label: "Step 4 — Todo App", sectionId: "tutorial" },
    ],
    "mental-model": [
      { id: "mental-model", label: "Widget tree" },
      { id: "widget-text-text", label: "Text widget", sectionId: "widgets" },
      { id: "widget-layout-padding", label: "Padding widget", sectionId: "widgets" },
      { id: "widget-layout-container", label: "Container widget", sectionId: "widgets" },
    ],
    state: coreApis.map((api) => ({
      id: apiAnchor(api),
      label: api.name,
      sectionId: "state",
    })),
    widgets: widgetGroups.map((group) => ({
      id: groupAnchor(group),
      label: group.title,
      sectionId: "widgets",
      children: widgetNavChildren(group),
    })),
    responsive: [
      { id: "responsive-mobile", label: "Mobile essentials", sectionId: "responsive" },
      { id: "responsive-fluid", label: "Fluid sizing", sectionId: "responsive" },
      { id: "responsive-overflow", label: "Overflow guards", sectionId: "responsive" },
      { id: "responsive-motion", label: "Motion & overrides", sectionId: "responsive" },
    ],
    imports: widgetGroups.map((group) => ({
      id: groupAnchor(group),
      label: `${group.title} widgets`,
      sectionId: "widgets",
    })),
    examples: [
      { id: "widget-layout-card", label: "Card widget", sectionId: "widgets" },
      { id: "widget-feedback-linear-progress-indicator", label: "LinearProgressIndicator", sectionId: "widgets" },
      { id: "widget-controls-button", label: "Button widget", sectionId: "widgets" },
    ],
    patterns: [
      { id: "pattern-theme", label: "Theme switching", sectionId: "patterns" },
      { id: "pattern-list", label: "Searchable list", sectionId: "patterns" },
      { id: "pattern-form", label: "Form validation", sectionId: "patterns" },
      { id: "pattern-routing", label: "Multi-page routing", sectionId: "patterns" },
    ],
    deployment: [
      { id: "deployment", label: "npm run build" },
      { id: "deployment", label: "npm run preview" },
      { id: "deployment", label: "Static output" },
    ],
  }[item.id];

  return { ...item, children };
});

const installCode = `npm install @neuralumina/lumina-ui@latest`;

const packageCode = `{
  "dependencies": {
    "@neuralumina/lumina-ui": "^${packageVersion}"
  },
  "devDependencies": {
    "vite": "^8.0.10"
  }
}`;

const quickStartCode = `import { mount, Column, Text, Button } from "@neuralumina/lumina-ui";

function App() {
  return Column({ gap: 12, padding: 16 }, [
    Text("Hello from LuminaUI", { as: "h1", size: 28, weight: 900 }),
    Button({
      text: "Click me",
      onClick: () => console.log("clicked"),
    }),
  ]);
}

mount(App, document.getElementById("app"));`;

const stateCode = `import { mount, useState, Column, Row, Text, Button } from "@neuralumina/lumina-ui";

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
    Text(\`Count: \${count()}\`, { weight: 900 }),
    Row({ gap: 8 }, [
      Button({ text: "-", onClick: () => setCount((value) => value - 1) }),
      Button({ text: "+", onClick: () => setCount((value) => value + 1) }),
    ]),
  ]);
}

mount(App, document.getElementById("app"));`;

const importCode = `import {
  mount,
  useState,
  Column,
  Row,
  Container,
  Text,
  Button,
} from "@neuralumina/lumina-ui";

import { Column, Row } from "@neuralumina/lumina-ui/widgets/layout";
import { Button } from "@neuralumina/lumina-ui/widgets/controls";
import { createStore } from "@neuralumina/lumina-ui/core/state";
import { createRouter, Router } from "@neuralumina/lumina-ui/widgets/routing";
import { DataTable } from "@neuralumina/lumina-ui/widgets/data";
import { DevTools } from "@neuralumina/lumina-ui/widgets/devtools";`;

const compositionCode = `import {
  Card,
  Column,
  Row,
  Text,
  Button,
  LinearProgressIndicator,
} from "@neuralumina/lumina-ui";

Card({ padding: 18, elevation: 2 }, [
  Column({ gap: 14 }, [
    Row({ mainAxisAlignment: "spaceBetween", gap: 12 }, [
      Text("Release health", { weight: 900, size: 18 }),
      Button({ text: "View logs", variant: "secondary" }),
    ]),
    LinearProgressIndicator({ value: 0.72 }),
    Text("72% complete", { color: "#4b5563" }),
  ]),
]);`;

const buildCode = `npm run build
npm run preview`;

// --- Tutorial code snippets ---

const tutorialStep1Code = `import { mount, Column, Text, Button } from "@neuralumina/lumina-ui";

// App is a plain function that returns a widget tree —
// nested function calls that describe what you want on screen.
function App() {
  return Column({ gap: 16, padding: 24 }, [
    Text("Hello, LuminaUI!", { as: "h1", size: 28, weight: 900 }),
    Text("This is your first widget tree.", { color: "#5b6677" }),
    Button({
      text: "Click me",
      onClick: () => alert("Hello from LuminaUI!"),
    }),
  ]);
}

// mount() converts the widget tree into real DOM nodes
// inside the container element you provide.
mount(App, document.getElementById("app"));`;

const tutorialStep2Code = `import { mount, useState, Column, Row, Text, Button } from "@neuralumina/lumina-ui";

// useState returns three things:
//   count()         — getter: call it to read the current value
//   setCount        — setter: call it to change the value
//   subscribeCount  — connect a callback that runs on every change
const [count, setCount, subscribeCount] = useState(0);

// A WeakSet prevents subscribing the same forceUpdate twice.
// App is called on every render — without this guard, subscribeCount
// would add a new listener each time, making the count jump per click.
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeCount(forceUpdate);  // re-render whenever count changes
  subscribed.add(forceUpdate);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Column({ gap: 12, padding: 24 }, [
    Text(\`Count: \${count()}\`, { size: 20, weight: 900 }),
    Row({ gap: 8 }, [
      Button({ text: "-", onClick: () => setCount((n) => n - 1) }),
      Button({ text: "+", onClick: () => setCount((n) => n + 1) }),
      Button({ text: "Reset", variant: "secondary", onClick: () => setCount(0) }),
    ]),
  ]);
}

mount(App, document.getElementById("app"));`;

const tutorialStep3Code = `import {
  mount, useState, Column, Row, Text, TextField, Button, FormField,
} from "@neuralumina/lumina-ui";

// Controlled input: value always comes from state. Every keystroke
// calls onChange which updates state, which re-renders the field.
const [name,  setName,  subscribeName]  = useState("");
const [names, setNames, subscribeNames] = useState([]);
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeName(forceUpdate);
  subscribeNames(forceUpdate);
  subscribed.add(forceUpdate);
}

function addName() {
  const trimmed = name().trim();
  if (!trimmed) return;                        // ignore empty input
  setNames((prev) => [...prev, trimmed]);      // append to list
  setName("");                                 // clear the input
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Column({ gap: 16, padding: 24 }, [
    Text("Guest list", { as: "h2", size: 22, weight: 900 }),
    Row({ gap: 8, style: { alignItems: "flex-end" } }, [
      FormField({ label: "Name" }, [
        TextField({ value: name(), placeholder: "Enter a name", onChange: setName }),
      ]),
      Button({ text: "Add", onClick: addName }),
    ]),
    // Render the list from state — just an array mapped to widgets.
    names().length
      ? Column({ gap: 6 }, names().map((n, i) => Text(\`\${i + 1}. \${n}\`)))
      : Text("No names yet.", { color: "#9ca3af" }),
  ]);
}

mount(App, document.getElementById("app"));`;

const tutorialTodoCode = `import {
  mount, useState,
  Column, Row, Text, TextField, Button, Checkbox,
  Divider, Scaffold, AppBar, Padding,
} from "@neuralumina/lumina-ui";

// --- State ---
const [todos, setTodos, subscribeTodos] = useState([]);
const [input, setInput, subscribeInput] = useState("");
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeTodos(forceUpdate);
  subscribeInput(forceUpdate);
  subscribed.add(forceUpdate);
}

// --- Actions ---
let nextId = 1;

function addTodo() {
  const text = input().trim();
  if (!text) return;
  setTodos((prev) => [...prev, { id: nextId++, text, done: false }]);
  setInput("");
}

function toggleTodo(id) {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
}

function removeTodo(id) {
  setTodos((prev) => prev.filter((t) => t.id !== id));
}

// --- Components ---
// TodoItem is a reusable function widget. The key prop lets
// LuminaUI track each item across re-renders as the list changes.
function TodoItem(todo) {
  return Row({ key: todo.id, gap: 8, style: { alignItems: "center" } }, [
    Checkbox({ checked: todo.done, onChange: () => toggleTodo(todo.id) }),
    Text(todo.text, {
      style: { flex: 1, textDecoration: todo.done ? "line-through" : "none" },
      color: todo.done ? "#9ca3af" : "#111827",
    }),
    Button({
      text: "Delete",
      variant: "text",
      onClick: () => removeTodo(todo.id),
      style: { color: "#ef4444" },
    }),
  ]);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  const done  = todos().filter((t) => t.done).length;
  const total = todos().length;

  return Scaffold({
    appBar: AppBar({ title: "My Todos" }),
    body: Padding({ padding: 20 }, [
      Column({ gap: 16 }, [
        Row({ gap: 8 }, [
          TextField({
            value: input(),
            placeholder: "What needs doing?",
            onChange: setInput,
            style: { flex: 1 },
          }),
          Button({ text: "Add", onClick: addTodo }),
        ]),
        total > 0
          ? Text(\`\${done} of \${total} done\`, { color: "#6b7280", size: 13 })
          : null,
        Divider(),
        total > 0
          ? Column({ gap: 8 }, todos().map(TodoItem))
          : Text("No tasks yet — add one above.", { color: "#9ca3af" }),
      ]),
    ]),
  });
}

mount(App, document.getElementById("app"));`;

// --- Patterns code snippets ---

const patternThemeCode = `import {
  mount, useState,
  Scaffold, AppBar, Padding, Column, Card, Text, Switch,
  ThemeProvider, createTheme,
} from "@neuralumina/lumina-ui";

// createTheme deep-merges your overrides with the default token set.
const lightTheme = createTheme({ colors: { surface: "#f8fafc", text: "#0f172a" } });
const darkTheme  = createTheme({ colors: { surface: "#0f172a", text: "#e2e8f0", primary: "#34d399" } });

const [dark, setDark, subscribeDark] = useState(false);
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeDark(forceUpdate);
  subscribed.add(forceUpdate);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  // ThemeProvider emits scoped CSS custom properties for the chosen theme.
  // Swap the theme object and every child widget updates immediately.
  return ThemeProvider({ theme: dark() ? darkTheme : lightTheme, applySurface: true }, [
    Scaffold({
      appBar: AppBar({
        title: "Theme demo",
        actions: [Switch({ value: dark(), onChange: setDark, ariaLabel: "Dark mode" })],
      }),
      body: Padding({ padding: 24 }, [
        Card({ padding: 20, elevation: 2 }, [
          Column({ gap: 8 }, [
            Text("Adaptive card", { weight: 900, size: 18 }),
            Text("This card responds to the active theme automatically."),
          ]),
        ]),
      ]),
    }),
  ]);
}

mount(App, document.getElementById("app"));`;

const patternListCode = `import {
  mount, useState,
  Scaffold, AppBar, Padding, Column, Row, Card, Text, TextField, Badge, GridView,
} from "@neuralumina/lumina-ui";

const products = [
  { id: 1, name: "Widget Pro",  category: "Tools",       stock: 24 },
  { id: 2, name: "Gadget Lite", category: "Accessories", stock: 8 },
  { id: 3, name: "Super Stack", category: "Tools",       stock: 0 },
  { id: 4, name: "Nano Kit",    category: "Accessories", stock: 57 },
];

const [search, setSearch, subscribeSearch] = useState("");
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeSearch(forceUpdate);
  subscribed.add(forceUpdate);
}

function ProductCard(product) {
  const inStock = product.stock > 0;
  return Card({ key: product.id, padding: 16, elevation: 1 }, [
    Column({ gap: 8 }, [
      Row({ gap: 8, style: { alignItems: "center" } }, [
        Text(product.name, { weight: 900, size: 15, style: { flex: 1 } }),
        Badge({ label: product.category }),
      ]),
      Text(inStock ? \`\${product.stock} in stock\` : "Out of stock", {
        size: 13,
        color: inStock ? "#059669" : "#ef4444",
      }),
    ]),
  ]);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  const term = search().toLowerCase();
  // Derive the filtered list directly in render — no extra state needed.
  const visible = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      )
    : products;

  return Scaffold({
    appBar: AppBar({ title: "Product Catalog" }),
    body: Padding({ padding: 20 }, [
      Column({ gap: 14 }, [
        TextField({ value: search(), placeholder: "Search products…", onChange: setSearch }),
        Text(\`\${visible.length} of \${products.length} results\`, { color: "#6b7280", size: 13 }),
        GridView({ items: visible, minColumnWidth: 200, gap: 12, itemBuilder: ProductCard }),
      ]),
    ]),
  });
}

mount(App, document.getElementById("app"));`;

const patternFormCode = `import {
  mount, useState,
  Column, Text, Button, TextField, TextArea, Dropdown, FormField, Form,
  Card, Padding, SnackBar, Scaffold, AppBar,
} from "@neuralumina/lumina-ui";

const roleOptions = [
  { label: "Designer", value: "designer" },
  { label: "Engineer", value: "engineer" },
  { label: "Manager",  value: "manager" },
];

const [name,   setName,   subscribeName]   = useState("");
const [role,   setRole,   subscribeRole]   = useState("");
const [bio,    setBio,    subscribeBio]    = useState("");
const [errors, setErrors, subscribeErrors] = useState({});
const [saved,  setSaved,  subscribeSaved]  = useState(false);
const subscribed = new WeakSet();

function bindState(forceUpdate) {
  if (subscribed.has(forceUpdate)) return;
  subscribeName(forceUpdate);
  subscribeRole(forceUpdate);
  subscribeBio(forceUpdate);
  subscribeErrors(forceUpdate);
  subscribeSaved(forceUpdate);
  subscribed.add(forceUpdate);
}

function validate() {
  const errs = {};
  if (!name().trim())     errs.name = "Name is required.";
  if (!role())            errs.role = "Please choose a role.";
  if (bio().length > 160) errs.bio  = "Bio must be 160 characters or fewer.";
  setErrors(errs);
  return Object.keys(errs).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  // POST to your API here, then show success:
  setSaved(true);
  setTimeout(() => setSaved(false), 3000);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Column([
    Scaffold({
      appBar: AppBar({ title: "Create Profile" }),
      body: Padding({ padding: 24 }, [
        Card({ padding: 20, elevation: 2 }, [
          // Form prevents the default browser submit and calls onSubmit.
          Form({ onSubmit: handleSubmit, gap: 16 }, [
            FormField({ label: "Full name", required: true, errorText: errors().name }, [
              TextField({ value: name(), onChange: setName, placeholder: "Jane Doe" }),
            ]),
            FormField({ label: "Role", required: true, errorText: errors().role }, [
              Dropdown({ value: role(), onChange: setRole, options: roleOptions, placeholder: "Choose role" }),
            ]),
            FormField({
              label: "Bio",
              helperText: \`\${bio().length} / 160 characters\`,
              errorText: errors().bio,
            }, [
              TextArea({ value: bio(), onChange: setBio, rows: 3, placeholder: "Tell us about yourself" }),
            ]),
            Button({ text: "Save profile", type: "submit" }),
          ]),
        ]),
      ]),
    }),
    SnackBar({
      open: saved(),
      message: "Profile saved!",
      action: Button({ text: "OK", variant: "text", onClick: () => setSaved(false) }),
    }),
  ]);
}

mount(App, document.getElementById("app"));`;

const patternRoutingCode = `import {
  mount,
  Column, Text, Padding, Card,
  createRouter, Router, NavLink, Scaffold, AppBar,
} from "@neuralumina/lumina-ui";

// --- Page components ---
function HomePage() {
  return Column({ gap: 12 }, [
    Text("Home", { as: "h1", size: 28, weight: 900 }),
    Text("You are on the home page."),
  ]);
}

function AboutPage() {
  return Column({ gap: 12 }, [
    Text("About", { as: "h1", size: 28, weight: 900 }),
    Text("LuminaUI is a Flutter-inspired widget library for the web."),
  ]);
}

// Dynamic route — the :id segment is extracted from the URL
// and passed as params.id to the component function.
function ProductPage({ params }) {
  return Column({ gap: 12 }, [
    Text(\`Product #\${params.id}\`, { as: "h1", size: 28, weight: 900 }),
    Card({ padding: 16, elevation: 1 }, [
      Text(\`Showing details for product ID: \${params.id}\`),
    ]),
  ]);
}

// --- Router setup ---
// createRouter returns a router instance used by Router and NavLink.
const router = createRouter({
  routes: [
    { path: "/",            component: HomePage },
    { path: "/about",       component: AboutPage },
    { path: "/product/:id", component: ProductPage },
    { path: "*",            child: Text("404 — Page not found", { color: "#ef4444" }) },
  ],
});

function App() {
  return Scaffold({
    appBar: AppBar({
      title: "Routing demo",
      actions: [
        // NavLink highlights automatically when its path matches the current URL.
        NavLink({ router, to: "/",           label: "Home",    exact: true }),
        NavLink({ router, to: "/about",      label: "About" }),
        NavLink({ router, to: "/product/42", label: "Product" }),
      ],
    }),
    body: Padding({ padding: 24 }, [
      // Router renders the component that matches the current URL.
      Router({ router }),
    ]),
  });
}

mount(App, document.getElementById("app"));`;

const jsKeywords = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "else",
  "export",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "let",
  "new",
  "null",
  "return",
  "switch",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
]);

const shellWords = new Set(["cd", "cp", "git", "mkdir", "npm", "npx", "pnpm", "yarn"]);

function bindState(forceUpdate) {
  if (subscribedUpdates.has(forceUpdate)) return;
  subscribeActiveSection(forceUpdate);
  subscribeActiveTarget(forceUpdate);
  subscribeDrawerOpen(forceUpdate);
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

function goToSection(id, sectionId = id) {
  setActiveSection(sectionId);
  setActiveTarget(id);
  setDrawerOpen(false);
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
  return RawElement(
    "a",
    {
      href,
      target: "_blank",
      rel: "noreferrer",
      className: `doc-button doc-button-${variant}`,
    },
    [label],
  );
}

function Pill(label, tone = "teal") {
  return RawElement("span", { className: `doc-pill doc-pill-${tone}` }, [
    label,
  ]);
}

function wordTokenType(word, language) {
  if (language === "bash") return shellWords.has(word) ? "keyword" : "plain";
  if (language === "json") return "plain";
  return jsKeywords.has(word) ? "keyword" : "plain";
}

function readQuoted(code, start) {
  const quote = code[start];
  let index = start + 1;

  while (index < code.length) {
    if (code[index] === "\\") {
      index += 2;
      continue;
    }
    if (code[index] === quote) {
      index += 1;
      break;
    }
    index += 1;
  }

  return code.slice(start, index);
}

function tokenizeCode(code, language) {
  const tokens = [];
  let plain = "";
  let index = 0;

  const pushPlain = () => {
    if (!plain) return;
    tokens.push({ type: "plain", text: plain });
    plain = "";
  };

  const push = (type, text) => {
    pushPlain();
    tokens.push({ type, text });
  };

  while (index < code.length) {
    const rest = code.slice(index);
    const char = code[index];

    if (rest.startsWith("//")) {
      const end = code.indexOf("\n", index);
      const text = end === -1 ? code.slice(index) : code.slice(index, end);
      push("comment", text);
      index += text.length;
      continue;
    }

    if (rest.startsWith("/*")) {
      const end = code.indexOf("*/", index + 2);
      const text = end === -1 ? code.slice(index) : code.slice(index, end + 2);
      push("comment", text);
      index += text.length;
      continue;
    }

    if (language === "bash" && char === "#") {
      const end = code.indexOf("\n", index);
      const text = end === -1 ? code.slice(index) : code.slice(index, end);
      push("comment", text);
      index += text.length;
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      const text = readQuoted(code, index);
      push("string", text);
      index += text.length;
      continue;
    }

    const numberMatch = rest.match(/^\b\d+(?:\.\d+)?\b/);
    if (numberMatch) {
      push("number", numberMatch[0]);
      index += numberMatch[0].length;
      continue;
    }

    const wordMatch = rest.match(/^[A-Za-z_$][\w$-]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const next = rest.slice(word.length);
      const type =
        wordTokenType(word, language) === "keyword"
          ? "keyword"
          : next.match(/^\s*\(/)
            ? "function"
            : "plain";

      if (type === "plain") plain += word;
      else push(type, word);
      index += word.length;
      continue;
    }

    if (/^[{}()[\],.:;=+\-*/<>|&!?]/.test(char)) {
      push("punctuation", char);
      index += 1;
      continue;
    }

    plain += char;
    index += 1;
  }

  pushPlain();
  return tokens;
}

function HighlightedCode(code, language) {
  return RawElement(
    "code",
    { className: `language-${language}` },
    tokenizeCode(code, language).map((token, index) =>
      RawElement(
        "span",
        {
          className: token.type === "plain" ? "syntax" : `syntax syntax-${token.type}`,
          key: `${token.type}-${index}`,
        },
        [token.text],
      ),
    ),
  );
}

function CodeBlock(code, language = "js") {
  return Column({ gap: 0, className: "code-shell" }, [
    Row(
      {
        mainAxisAlignment: "spaceBetween",
        className: "code-toolbar",
      },
      [
        Text(language, { size: 12, weight: 900, color: "#7c8797" }),
        Button({
          text: "Copy",
          variant: "text",
          onClick: () => copyCode(code),
          style: {
            minHeight: "30px",
            padding: "5px 9px",
            color: "#dbeafe",
          },
        }),
      ],
    ),
    RawElement("pre", { className: "code-block" }, [
      HighlightedCode(code, language),
    ]),
  ]);
}

function Section({ id, eyebrow, title, intro, children }) {
  return RawElement("section", { id, className: "docs-section" }, [
    Column({ gap: 18 }, [
      Column({ gap: 9, className: "section-heading" }, [
        eyebrow
          ? Text(eyebrow, {
              size: 12,
              weight: 900,
              color: "#0f8f67",
              style: { textTransform: "uppercase" },
            })
          : null,
        Text(title, { as: "h2", size: 32, weight: 900 }),
        intro
          ? Text(intro, {
              size: 17,
              color: "#5b6677",
              lineHeight: 1.65,
              style: { maxWidth: "880px" },
            })
          : null,
      ]),
      ...children,
    ]),
  ]);
}

function HighlightCard(item) {
  return Card(
    { padding: 20, radius: 8, elevation: 1, className: "highlight-card" },
    [
      Column({ gap: 10 }, [
        Text(item.title, { as: "h3", size: 18, weight: 900 }),
        Text(item.body, { color: "#5b6677", lineHeight: 1.6 }),
      ]),
    ],
  );
}

function StatCard(label, value, detail) {
  return Card({ padding: 18, radius: 8, elevation: 1, className: "stat-card" }, [
    Column({ gap: 5 }, [
      Text(value, { size: 24, weight: 900, color: "#111827" }),
      Text(label, { size: 13, weight: 900, color: "#0f8f67" }),
      detail ? Text(detail, { size: 13, color: "#64748b" }) : null,
    ]),
  ]);
}

function ApiCard(item) {
  return Card({ id: apiAnchor(item), padding: 16, radius: 8, elevation: 1, className: "api-card anchor-target" }, [
    Column({ gap: 8 }, [
      Text(item.name, {
        as: "h3",
        size: 17,
        weight: 900,
        className: "widget-name",
      }),
      Text(item.description, { color: "#5b6677", lineHeight: 1.55 }),
      item.props
        ? RawElement("code", { className: "inline-code" }, [item.props])
        : null,
    ]),
  ]);
}

function WidgetCard(group, widget) {
  return Card(
    {
      id: widgetAnchor(group, widget),
      padding: 16,
      radius: 8,
      elevation: 1,
      className: "widget-card anchor-target",
    },
    [
      Column({ gap: 9 }, [
        Row({ gap: 8, style: { alignItems: "center", flexWrap: "wrap" } }, [
          Text(widget.name, {
            as: "h3",
            size: 17,
            weight: 900,
            className: "widget-name",
          }),
          Pill(group.title, "slate"),
        ]),
        Text(widget.description, { color: "#5b6677", lineHeight: 1.55 }),
        RawElement("code", { className: "inline-code widget-props" }, [
          widget.props,
        ]),
      ]),
    ],
  );
}

function filteredWidgetGroups() {
  const term = searchTerm().trim().toLowerCase();
  if (!term) return widgetGroups;

  return widgetGroups
    .map((group) => ({
      ...group,
      widgets: group.widgets.filter((widget) =>
        [
          group.title,
          group.importPath,
          group.summary,
          widget.name,
          widget.description,
          widget.props,
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
    }))
    .filter((group) => group.widgets.length);
}

function NavItem(item, depth = 0, rootId = item.id) {
  const sectionId = item.sectionId || rootId;
  const active =
    activeTarget() === item.id || (depth === 0 && activeSection() === item.id);

  return Column(
    {
      gap: 4,
      className: `nav-node nav-node-depth-${depth}`,
    },
    [
      RawElement(
        "button",
        {
          type: "button",
          className: [
            "side-link",
            `side-link-depth-${depth}`,
            active ? "side-link-active" : "",
          ]
            .filter(Boolean)
            .join(" "),
          onClick: () => goToSection(item.id, sectionId),
        },
        [item.label],
      ),
      item.children?.length
        ? Column(
            {
              gap: 3,
              className: `nav-children nav-children-depth-${depth}`,
            },
            item.children.map((child) => NavItem(child, depth + 1, sectionId)),
          )
        : null,
    ],
  );
}

function NavigationTree(className = "") {
  return Column(
    { gap: 6, className: ["sidebar-nav", className].filter(Boolean).join(" ") },
    navItems.map((item) => NavItem(item)),
  );
}

function Sidebar() {
  return RawElement("aside", { className: "sidebar" }, [
    Column({ gap: 22 }, [
      Row({ gap: 12, className: "brand-lockup" }, [
        Image({
          src: "/favicon.svg",
          alt: "LuminaUI logo",
          width: 42,
          height: 42,
          radius: 8,
        }),
        Column({ gap: 0, className: "brand-copy" }, [
          Text("LuminaUI", { weight: 900, size: 18 }),
          Text(`Package docs v${packageVersion}`, {
            color: "#64748b",
            size: 12,
            weight: 800,
          }),
        ]),
      ]),
      NavigationTree(),
    ]),
  ]);
}

function MobileDrawer() {
  if (!drawerOpen()) return null;

  return RawElement(
    "div",
    {
      className: "mobile-drawer",
      role: "presentation",
      onClick: () => setDrawerOpen(false),
    },
    [
      RawElement(
        "aside",
        {
          className: "drawer-panel",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Documentation navigation",
          onClick: (event) => event.stopPropagation(),
        },
        [
          Row(
            {
              mainAxisAlignment: "spaceBetween",
              gap: 12,
              className: "drawer-header",
            },
            [
              Row({ gap: 10, className: "brand-lockup" }, [
                Image({
                  src: "/favicon.svg",
                  alt: "LuminaUI logo",
                  width: 34,
                  height: 34,
                  radius: 7,
                }),
                Column({ gap: 0 }, [
                  Text("Navigation", { weight: 900, size: 18 }),
                  Text("Sections and widgets", {
                    size: 12,
                    color: "#64748b",
                    weight: 800,
                  }),
                ]),
              ]),
              Button({
                text: "Close",
                variant: "text",
                onClick: () => setDrawerOpen(false),
              }),
            ],
          ),
          NavigationTree("drawer-nav"),
        ],
      ),
    ],
  );
}

function TopBar() {
  return RawElement("header", { className: "topbar" }, [
    Row(
      {
        mainAxisAlignment: "spaceBetween",
        gap: 16,
        className: "topbar-inner",
      },
      [
        Row({ gap: 10, className: "topbar-brand" }, [
          Image({
            src: "/favicon.svg",
            alt: "LuminaUI logo",
            width: 32,
            height: 32,
            radius: 7,
          }),
          Column({ gap: 0 }, [
            Text("LuminaUI Documentation", { weight: 900, size: 18 }),
            Text(packageName, { size: 12, color: "#64748b", weight: 800 }),
          ]),
        ]),
        Row({ gap: 10, className: "doc-actions" }, [
          Button({
            text: "Menu",
            variant: "secondary",
            className: "drawer-toggle",
            onClick: () => setDrawerOpen(true),
          }),
          LinkButton({
            href: "https://www.npmjs.com/package/@neuralumina/lumina-ui",
            label: "npm",
            variant: "secondary",
          }),
          LinkButton({
            href: "https://github.com/AmelCMM/LuminaUI",
            label: "GitHub",
            variant: "primary",
          }),
        ]),
      ],
    ),
  ]);
}

function OverviewSection() {
  return Section({
    id: "overview",
    eyebrow: "Package",
    title: "LuminaUI is a widget library for plain JavaScript apps.",
    intro:
      "This documentation covers the public npm package surface for @neuralumina/lumina-ui, including installation, state, imports, and every widget exported by the current package version.",
    children: [
      Row({ gap: 12, className: "pill-row" }, [
        Pill(`v${packageVersion}`, "teal"),
        Pill(`${totalWidgets} widgets`, "blue"),
        Pill(packageLicense, "amber"),
        Pill("ES modules", "slate"),
      ]),
      Row({ gap: 14, className: "stats-grid" }, [
        StatCard("Current package", `v${packageVersion}`, "Read from package.json"),
        StatCard("Public widgets", String(totalWidgets), "Documented below"),
        StatCard("Core exports", String(coreApis.length), "Renderer, state, DOM, theme"),
      ]),
      Row({ gap: 16, className: "highlight-grid" }, highlights.map(HighlightCard)),
    ],
  });
}

function InstallationSection() {
  return Section({
    id: "installation",
    eyebrow: "Setup",
    title: "Install the latest npm package.",
    intro:
      "Install the package from npm and import it from any ESM-capable app. Vite, Parcel, Webpack, and modern dev servers can resolve the package entry directly.",
    children: [
      CodeBlock(installCode, "bash"),
      CodeBlock(packageCode, "json"),
      Row({ gap: 12, className: "pill-row" }, [
        Pill(`latest: ${packageVersion}`, "teal"),
        Pill("sideEffects: false", "blue"),
        Pill("browser ESM", "amber"),
      ]),
    ],
  });
}

function QuickStartSection() {
  return Section({
    id: "quick-start",
    eyebrow: "First app",
    title: "Mount a widget tree.",
    intro:
      "A LuminaUI app is a component function that returns widgets, text, arrays, empty values, or real DOM nodes. mount() renders the tree into your root element.",
    children: [CodeBlock(quickStartCode)],
  });
}

function MentalModelSection() {
  return Section({
    id: "mental-model",
    eyebrow: "Concepts",
    title: "Widgets are functions that describe DOM.",
    intro:
      "Most widgets accept either children directly or a props object followed by children. Numeric dimensions are generally converted to pixels; strings pass through as CSS values.",
    children: [
      Row({ gap: 16, className: "docs-two-col" }, [
        Column({ gap: 12 }, [
          Text("Renderable values", { as: "h3", size: 20, weight: 900 }),
          RawElement("ul", { className: "doc-list" }, [
            RawElement("li", {}, ["Virtual node objects: { tag, props, children, key }"]),
            RawElement("li", {}, ["Strings and numbers"]),
            RawElement("li", {}, ["Arrays of children"]),
            RawElement("li", {}, ["null, undefined, false, and true for empty output"]),
            RawElement("li", {}, ["Real DOM Node values when direct DOM interop is needed"]),
          ]),
        ]),
        Column({ gap: 12 }, [
          Text("Calling styles", { as: "h3", size: 20, weight: 900 }),
          CodeBlock(`Column([
  Text("Compact child style"),
]);

Column({ gap: 12, padding: 16 }, [
  Text("Configured props style"),
]);

Padding({ padding: 16, child: Text("Single child prop") });`),
        ]),
      ]),
    ],
  });
}

function StateSection() {
  return Section({
    id: "state",
    eyebrow: "Reactivity",
    title: "State uses explicit getters, setters, and subscribers.",
    intro:
      "useState returns [get, set, subscribe]. Subscribe the renderer forceUpdate function once, then read state through getters during render.",
    children: [
      CodeBlock(stateCode),
      Row({ gap: 16, className: "api-grid" }, coreApis.map(ApiCard)),
    ],
  });
}

function WidgetFamily(group) {
  return RawElement("article", { id: groupAnchor(group), className: "widget-family anchor-target" }, [
    Column({ gap: 14 }, [
      Row({ gap: 12, className: "widget-family-heading" }, [
        Column({ gap: 7, style: { minWidth: 0 } }, [
          Text(group.title, { as: "h3", size: 24, weight: 900 }),
          Text(group.summary, { color: "#5b6677", lineHeight: 1.6 }),
        ]),
        Pill(`${group.widgets.length} exports`, "blue"),
      ]),
      RawElement("code", { className: "import-path" }, [group.importPath]),
      Row(
        { gap: 14, className: "widget-grid" },
        group.widgets.map((widget) => WidgetCard(group, widget)),
      ),
      CodeBlock(group.example),
    ]),
  ]);
}

function WidgetsSection() {
  const groups = filteredWidgetGroups();
  const visibleCount = groups.reduce((sum, group) => sum + group.widgets.length, 0);

  return Section({
    id: "widgets",
    eyebrow: "Reference",
    title: "Full widget reference.",
    intro:
      "Every public widget exported by @neuralumina/lumina-ui is grouped by module below. Use search to narrow by widget name, module, purpose, or key props.",
    children: [
      Row({ gap: 12, className: "search-row" }, [
        TextField({
          value: searchTerm(),
          placeholder: "Search widgets, groups, imports, or props...",
          onChange: setSearchTerm,
          className: "docs-search",
        }),
        Pill(`${visibleCount} shown`, "teal"),
      ]),
      groups.length
        ? Column({ gap: 34 }, groups.map(WidgetFamily))
        : Text("No widgets match that search.", { color: "#64748b" }),
    ],
  });
}

function ImportsSection() {
  return Section({
    id: "imports",
    eyebrow: "Modules",
    title: "Import from the package entry or subpaths.",
    intro:
      "The top-level entry exports the framework API and all widgets. Subpath imports are available when you want explicit module boundaries.",
    children: [CodeBlock(importCode)],
  });
}

function ExamplesSection() {
  return Section({
    id: "examples",
    eyebrow: "Pattern",
    title: "Compose production UI from small widgets.",
    intro:
      "LuminaUI widgets stay close to browser concepts, so layout, state, and events remain easy to inspect while still reading like a UI tree.",
    children: [
      CodeBlock(compositionCode),
      Container({ className: "live-example" }, [
        Column({ gap: 16 }, [
          Row({ gap: 8, mainAxisAlignment: "spaceBetween", className: "live-header" }, [
            Text("Live preview", { weight: 900, size: 18 }),
            Button({
              text: "View logs",
              variant: "secondary",
              onClick: () => notify("Preview action clicked"),
            }),
          ]),
          Divider(),
          Column({ gap: 12 }, [
            Row({ gap: 8, mainAxisAlignment: "spaceBetween", className: "live-header" }, [
              Text("Release health", { weight: 900, size: 18 }),
              Pill("72%", "teal"),
            ]),
            RawElement("div", { className: "preview-progress" }, [
              RawElement("span", { style: { width: "72%" } }, []),
            ]),
            Text("Everything in this preview is rendered from LuminaUI widgets.", {
              color: "#5b6677",
            }),
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
    intro:
      "LuminaUI ships browser-friendly ESM. Build this documentation site with Vite and deploy the generated dist folder to any static host.",
    children: [
      CodeBlock(buildCode, "bash"),
      RawElement("ul", { className: "doc-list" }, [
        RawElement("li", {}, ["Vite writes optimized assets to dist/."]),
        RawElement("li", {}, ["The built docs can run on static hosts such as Vercel, Netlify, Cloudflare Pages, GitHub Pages, or S3."]),
        RawElement("li", {}, ["No server runtime is required for the documentation itself."]),
      ]),
    ],
  });
}

function TutorialSection() {
  return Section({
    id: "tutorial",
    eyebrow: "Learn",
    title: "Build your first app, step by step.",
    intro:
      "Four short examples that take you from a static widget tree to a fully reactive todo app. Each step introduces one new concept. Copy any example into a fresh project and open it in the browser to try it.",
    children: [
      Column({ id: "tutorial-step-1", className: "anchor-target", gap: 10 }, [
        Text("Step 1 — Your first widget tree", { as: "h3", size: 20, weight: 900 }),
        Text(
          "An App function returns widgets. Column stacks them vertically. Text and Button are the most common starting widgets. mount() turns the tree into real DOM nodes.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(tutorialStep1Code),
      ]),
      Column({ id: "tutorial-step-2", className: "anchor-target", gap: 10 }, [
        Text("Step 2 — Reactive state", { as: "h3", size: 20, weight: 900 }),
        Text(
          "useState returns [get, set, subscribe]. Subscribe forceUpdate once so every change triggers a re-render. Read the getter inside render — each call returns the current value at that moment.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(tutorialStep2Code),
        RawElement("div", {
          style: {
            padding: "13px 16px",
            border: "1px solid rgba(15,143,103,0.22)",
            borderRadius: "8px",
            background: "rgba(15,143,103,0.06)",
          },
        }, [
          Column({ gap: 5 }, [
            Text("Why WeakSet?", { weight: 900, size: 13, color: "#0c6f52" }),
            Text(
              "App runs on every render. Without the WeakSet guard, subscribeCount would register a new listener each time and the counter would update multiple values per click.",
              { size: 13, color: "#374151", lineHeight: 1.6 },
            ),
          ]),
        ]),
      ]),
      Column({ id: "tutorial-step-3", className: "anchor-target", gap: 10 }, [
        Text("Step 3 — Controlled input and lists", { as: "h3", size: 20, weight: 900 }),
        Text(
          "TextField is a controlled widget — its value always comes from state and every keystroke calls onChange. Lists are just JavaScript arrays mapped to widget arrays. No special list API is needed.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(tutorialStep3Code),
      ]),
      Column({ id: "tutorial-step-4", className: "anchor-target", gap: 10 }, [
        Text("Step 4 — A complete todo app", { as: "h3", size: 20, weight: 900 }),
        Text(
          "State, controlled input, list rendering, Checkbox, and the Scaffold shell combined into a full working app. Add key to each list item so LuminaUI can track items accurately as the list changes.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(tutorialTodoCode),
      ]),
    ],
  });
}

function PatternsSection() {
  return Section({
    id: "patterns",
    eyebrow: "Cookbook",
    title: "Common UI patterns with full code.",
    intro:
      "Ready-to-copy patterns for the most common real-world scenarios. Each example is self-contained and imports only from the public LuminaUI package. Use these as starting points for your own features.",
    children: [
      Column({ id: "pattern-theme", className: "anchor-target", gap: 10 }, [
        Text("Theme switching", { as: "h3", size: 20, weight: 900 }),
        Text(
          "createTheme produces a token set by merging your overrides with the defaults. ThemeProvider applies the tokens as scoped CSS variables. Swap the theme object on a state change and every child widget updates instantly — no prop drilling required.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(patternThemeCode),
      ]),
      Column({ id: "pattern-list", className: "anchor-target", gap: 10 }, [
        Text("Searchable product list", { as: "h3", size: 20, weight: 900 }),
        Text(
          "Derive the filtered list from search state directly in the render function. The filtered array is a local variable that recomputes on every render — no extra state, no useEffect, no memoization needed for small datasets.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(patternListCode),
      ]),
      Column({ id: "pattern-form", className: "anchor-target", gap: 10 }, [
        Text("Form with validation", { as: "h3", size: 20, weight: 900 }),
        Text(
          "Keep one errors object in state. Form prevents the default browser submit and calls your onSubmit handler. Populate errorText on each FormField to show inline errors. A SnackBar confirms success without a page navigation.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(patternFormCode),
      ]),
      Column({ id: "pattern-routing", className: "anchor-target", gap: 10 }, [
        Text("Multi-page routing", { as: "h3", size: 20, weight: 900 }),
        Text(
          "createRouter registers your routes. Router renders the matched page. NavLink highlights the active link automatically. Dynamic segments like :id are extracted from the URL and arrive as params inside the component function.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(patternRoutingCode),
      ]),
    ],
  });
}

const responsiveFluidCode = `import { Heading, Dialog, Card, Text } from "@neuralumina/lumina-ui";

// Heading sizes are fluid: level 1 renders 24px on phones
// and grows to 32px on desktop viewports.
Heading({ level: 1 }, "Scales with the viewport");

// Dialog and Card padding tighten automatically on narrow screens,
// and Dialog height tracks the visible mobile viewport (dvh), so it
// stays fully reachable with the address bar or keyboard open.
Dialog({ open: settingsOpen(), onDismiss: closeSettings }, [
  Card([Text("No breakpoints required.")]),
]);`;

const responsiveOverflowCode = `import { GridView, TabBar, Card, Text } from "@neuralumina/lumina-ui";

// Grid columns never force horizontal overflow — a 200px minimum
// collapses to the container width on screens narrower than one column.
GridView({
  items: products,
  minColumnWidth: 200,
  gap: 12,
  itemBuilder: (product) => Card({ key: product.id }, [Text(product.name)]),
});

// TabBar scrolls sideways when its tabs no longer fit.
TabBar({ tabs, value: activeTab(), onChange: setActiveTab });`;

const responsiveOverrideCode = `// Every fluid default is a plain inline style you can override:
Card({ padding: 24 });                      // fixed padding, no clamp
Heading({ level: 1, size: 40 }, "Custom");  // fixed heading size

// Only the mobile usability rules ship as CSS media queries
// (16px field text under 640px, 44px touch targets on touch screens).`;

function ResponsiveSection() {
  return Section({
    id: "responsive",
    eyebrow: "Adaptive UI",
    title: "Responsive from small phones to desktop screens.",
    intro:
      "Since v0.2.0 every widget ships with adaptive defaults: fluid type and spacing, dynamic-viewport sizing, safe-area awareness, and touch-friendly hit targets. You get sensible behavior on a 320px phone and a 4K desktop without writing media queries.",
    children: [
      Column({ id: "responsive-mobile", className: "anchor-target", gap: 10 }, [
        Text("Mobile essentials", { as: "h3", size: 20, weight: 900 }),
        Text(
          "The defaults below are tuned for touch devices and small viewports and require no configuration.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        RawElement("ul", { className: "doc-list" }, [
          RawElement("li", {}, ["Text fields render 16px text under 640px, which stops iOS Safari from zooming into focused inputs."]),
          RawElement("li", {}, ["Buttons, menu items, combo box options, and pagination controls grow to 44px minimum hit targets on touch screens; Switch gains an invisible tap halo around its 24px track."]),
          RawElement("li", {}, ["SnackBar, BottomNavigationBar, and DevTools respect safe-area insets, clearing the iPhone home indicator and notch."]),
        ]),
      ]),
      Column({ id: "responsive-fluid", className: "anchor-target", gap: 10 }, [
        Text("Fluid sizing", { as: "h3", size: 20, weight: 900 }),
        Text(
          "Headings, dialog and card padding, and the AppBar scale continuously with the viewport using CSS clamp() and min(). Dialogs, overlays, and combo box lists cap their height with dynamic viewport units so they never hide behind mobile browser chrome.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(responsiveFluidCode),
      ]),
      Column({ id: "responsive-overflow", className: "anchor-target", gap: 10 }, [
        Text("Overflow guards", { as: "h3", size: 20, weight: 900 }),
        Text(
          "Images and buttons never exceed their container, popovers clamp to the viewport, DataTable scrolls with touch momentum, GridView columns collapse instead of overflowing, and TabBar switches to horizontal scrolling when space runs out.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(responsiveOverflowCode),
      ]),
      Column({ id: "responsive-motion", className: "anchor-target", gap: 10 }, [
        Text("Motion & overrides", { as: "h3", size: 20, weight: 900 }),
        Text(
          "The global stylesheet honors prefers-reduced-motion by disabling LuminaUI animations and transitions for users who request it, and disables mobile text auto-inflation. Fluid defaults are ordinary inline styles, so passing your own style or size props always wins.",
          { color: "#5b6677", lineHeight: 1.65 },
        ),
        CodeBlock(responsiveOverrideCode),
      ]),
    ],
  });
}

function DocsContent() {
  return RawElement("main", { className: "docs-content" }, [
    OverviewSection(),
    InstallationSection(),
    QuickStartSection(),
    TutorialSection(),
    MentalModelSection(),
    StateSection(),
    WidgetsSection(),
    ResponsiveSection(),
    ImportsSection(),
    ExamplesSection(),
    PatternsSection(),
    DeploymentSection(),
  ]);
}

function App(forceUpdate) {
  bindState(forceUpdate);

  return Container({ className: "docs-app" }, [
    TopBar(),
    MobileDrawer(),
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
