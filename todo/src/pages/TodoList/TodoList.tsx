import { useCallback, useState } from "react";
import { useHotKey } from "../../hooks/useHotKey";

export function TodoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = useCallback(() => {
    if (!todo) return;
    if (todos.includes(todo)) return;
    setTodos([...todos, todo]);
    setTodo("");
  }, [todo]);

  useHotKey("Enter", addTodo);

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
