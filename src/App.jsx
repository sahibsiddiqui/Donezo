import './app.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
{/* importing 4icons/ here */}
import { MdDelete } from "react-icons/md";
import { IoEnterSharp } from "react-icons/io5";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const savedTodos = JSON.parse(todoString);
        if (Array.isArray(savedTodos)) {
          setTodos(savedTodos);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        localStorage.removeItem("todos");
      }
    }
    setIsInitialized(true);
  }, []);
  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isInitialized]);
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (editingId) {
      const updatedTodos = todos.map((item) =>
        item.id === editingId ? { ...item, text: todo } : item
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo = { id: uuidv4(), text: todo, isCompleted: false };
      setTodos([...todos, newTodo]);
    }

    setTodo("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const editableTodo = todos.find((item) => item.id === id);
    if (editableTodo) {
      setTodo(editableTodo.text);
      setEditingId(id);
    }
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className='container bg-violet-100 mx-auto my-5 rounded-xl p-5 min-h-[80vh] flex flex-col items-center'>

        {/* Add wala section */}
        <div className="w-full max-w-md">
          <h2 className='text-2xl font-bold mb-4 text-center'>{editingId ? "Edit ToDo" : "Add a ToDo"}</h2>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="flex-1 rounded border border-gray-400 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Enter your task..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 px-4 py-2 text-white font-bold rounded-md"
            >
              {editingId ? <MdOutlineSystemUpdateAlt /> : <IoEnterSharp />}
            </button>
          </div>
        </div>

        {/* ToDos list wala section */}
        <div className="w-full max-w-md mt-8">
          <h2 className='text-2xl font-bold mb-4 text-center'>Your ToDo's</h2>

          {todos.map((todoItem) => (
            <div key={todoItem.id} className="flex items-center justify-between bg-white p-3 mb-3 rounded-md shadow-sm">
              <div className="flex items-center gap-2 overflow-hidden">
                <input
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={() => handleToggle(todoItem.id)}
                />
                <span className={`text-sm ${todoItem.isCompleted ? "line-through text-gray-400" : ""} truncate max-w-[180px]`}>
                  {todoItem.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todoItem.id)}
                  className="bg-violet-800 hover:bg-violet-950 text-white px-3 py-1 rounded text-xs"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(todoItem.id)}
                  className="bg-violet-800 hover:bg-violet-950 text-white px-3 py-1 rounded text-xs"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default App;
