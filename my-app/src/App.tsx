import { useState } from "react";
import { WorkTask } from "./models/PriorityTask";
import { PersonalTask } from "./models/TaskManager";
import { Task } from "./models/Task";
import type { Category, Priority } from "./models/Task";
import { Container } from "postcss";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("work");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState<string>("");

  const addTask = () => {
    if (!title.trim()) return;
    const id = tasks.length + 1;
    let newTask: Task;
    if (category === "work") {
      newTask = new WorkTask(id, title, priority, deadline || null);
    } else {
      newTask = new PersonalTask(id, title, priority, deadline || null);
    }
    setTasks(prev => [...prev, newTask]);
    setTitle("");
    setDeadline("");
    setPriority("medium");
    setCategory("work");
  };

  const toggleTask = (id: number) => {
    console.log("Toggling task with id:", id);
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const detail = task.getDetails();
          const toggledCompleted = !detail.completed;
          if (detail.category === "work") {
            const t = new WorkTask(detail.id, detail.title, detail.priority, detail.deadline);
            t.completed = toggledCompleted;
            return t;
          } else {
            const t = new PersonalTask(detail.id, detail.title, detail.priority, detail.deadline);
            t.completed = toggledCompleted;
            return t;
          }
        }
        return task;
      })
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 OOP Todo App</h1>

      {/* Input Form */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-gray-50">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />

        <div className="flex gap-2 mb-2">
          <select
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="px-3 py-2 border rounded"
          >
            <option value="work">Work Task</option>
            <option value="personal">Personal Task</option>
          </select>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
            className="px-3 py-2 border rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
        </div>

        <button
          onClick={addTask}
          className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map(task => {
          const detail = task.getDetails();
          console.log("helloo ",detail);
          return (
            <li
              key={detail.id}
              className="p-3 border rounded-lg flex justify-between items-center bg-white shadow"
            >
              <span>
                <span className="font-bold">{detail.title}</span>
                {" "}
                <span className="text-xs px-2 py-1 rounded bg-gray-100">{detail.category}</span>
                {" "}
                <span className="text-xs px-2 py-1 rounded bg-yellow-100">{detail.priority}</span>
                {" "}
                {detail.deadline && (
                  <span className="text-xs px-2 py-1 rounded bg-red-100">
                    Deadline: {detail.deadline}
                  </span>
                )}
                {" "}
                <span className="ml-2">{detail.completed ? "✅" : "❌"}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(detail.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Toggle
                </button>
                <button
                  onClick={() => deleteTask(detail.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
