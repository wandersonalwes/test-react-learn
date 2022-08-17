import { useEffect, useState } from "react";

export function TodoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (!todo) return;
    if (todos.includes(todo)) return;
    setTodos([...todos, todo]);
    setTodo("");
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addTodo();
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, [todo]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          data-testid="todo-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo} data-testid="todo-button">
          Add
        </button>
      </div>

      <ul data-testid="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
