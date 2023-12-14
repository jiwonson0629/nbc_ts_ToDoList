import React from "react";
import "./App.css";
import Input from "./components/Input";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <header>
        <h1>To Do List</h1>
      </header>
      <div>
        <Input />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
