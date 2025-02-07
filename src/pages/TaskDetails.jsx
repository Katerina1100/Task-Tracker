import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const handleDelete = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/dashboard");
  };

  return (
    <div className="details-container">
      <h1>{task.title}</h1>
      <div className="task-details">
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      </div>
      <div className=" d-flex">
      <div className="button-container">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate("/edit-task/" + task.id)}>Edit</button>
      </div>
  
      <button className="back-button" onClick={() => navigate("/dashboard")}>Back</button>
      </div>
    </div>
  );
}  

export default TaskDetails;
