import React, { useState, useRef } from "react";

type formElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: formElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name: name, done: false }];
    setTasks(newTasks);
  };

  const changeState = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const deleteTask = (i: number): void => {
    const tasksList: ITask[] = [...tasks];
    tasksList.splice(i, 1);
    setTasks(tasksList);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  ref={taskInput}
                  autoFocus
                />
                <button
                  className="btn btn-success mt-2"
                  style={{ width: "100%" }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {tasks.map((task: ITask, i: number) => (
        <div className="card card-body mt-2" key={i}>
          <h2 style={{ textDecoration: task.done ? "line-through" : "" }}>
            {task.name}
          </h2>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => changeState(i)}
            >
              {task.done ? "✅" : "✗"}
            </button>
            <button className="btn btn-danger" onClick={() => deleteTask(i)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
