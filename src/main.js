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