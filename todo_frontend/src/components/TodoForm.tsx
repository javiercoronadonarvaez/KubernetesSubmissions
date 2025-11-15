import React, { useState } from "react";

const HARDCODED_TODOS = ["Learn JavaScript", "Learn React", "Build a project"];

const TodoForm: React.FC = () => {
  const [input, setInput] = useState("");
  //   const [todos, _] = useState<string[]>(HARDCODED_TODOS); // Potentially to be enabled soon
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 140) {
      setError("Todo must be 140 characters or less.");
    } else {
      setError("");
    }
  };

  const handleSend = () => {
    if (input.length === 0) return;
    if (input.length > 140) {
      setError("Todo must be 140 characters or less.");
      return;
    }
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
        {HARDCODED_TODOS.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;
