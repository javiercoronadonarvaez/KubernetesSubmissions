import { useState, useEffect } from "react";
import axios from "../utils/apiClient";

const TodoForm: React.FC = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [error, setError] = useState("");

  const refreshTodos = async () => {
    const { data } = await axios.get("/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 140) {
      setError("Todo must be 140 characters or less.");
    } else {
      setError("");
    }
  };

  const handleSend = async () => {
    if (input.length === 0) return;
    if (input.length > 140) {
      setError("Todo must be 140 characters or less.");
      return;
    }
    const { data } = await axios.post("/todos", {
      title: input,
    });
    setTodos([...todos, data.todo]);
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        maxLength={140}
        placeholder="Add a new todo..."
      />
      <button
        onClick={handleSend}
        disabled={input.length === 0 || input.length > 140}
      >
        Send
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;
