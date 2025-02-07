import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Notification from "../components/Notification";
import tasksData from "../data/tasks.json";

function Dashboard() {
  const [notification, setNotification] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
      savedTasks = savedTasks.map(task => task.owner ? task : { ...task, owner: "user" });
      if (savedTasks.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        return savedTasks;
      } else {
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        return tasksData;
      }
    },
  });
  
const currentUser = localStorage.getItem("currentUser") || "user";

const userTasks = tasks.filter((task) => task.owner === currentUser);

const filteredTasks = useMemo(() => {
  return userTasks.filter((task) => {
    const statusMatch = filterStatus === "All" || task.status === filterStatus;
    const priorityMatch = filterPriority === "All" || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });
}, [userTasks, filterStatus, filterPriority]);


  const markAsCompletedMutation = useMutation({
    mutationFn: (id) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    onSuccess: (updatedTasks) => {
      queryClient.invalidateQueries(["tasks"]); 
      setNotification("Task marked as completed!");
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const resetFilters = () => {
    setFilterStatus("All");
    setFilterPriority("All");
  };

  return (
    <div className="dashboard-container">
      <h1 className="d-flex align-items-top">Task Tracker</h1>
      <button onClick={handleLogout} className="btn logout-btn">Logout</button>

      <Notification message={notification} onClose={() => setNotification("")} />

      
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>Error loading tasks!</p>}

      {!isLoading && !error && (
        <>
          <div className="d-flex form-select-dashboard">
            <Link to="/add-task">
              <button className="btn dashboard-btn">+ Add Task</button>
            </Link>

            <div className="d-flex flex-row gap-2">
              <label className="label-name d-flex align-items-center">Status: </label>
              <select className="form-select" onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                <option  value="All">All</option>
                <option  value="To Do">To Do</option>
                <option  value="In Progress">In Progress</option>
                <option  value="Completed">Completed</option>
              </select>
            </div>

            <div className="d-flex flex-row gap-2">
              <label className=" label-name d-flex align-items-center">Priority: </label>
              <select className="form-select" onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
                <option  value="All">All</option>
                <option  value="High">High</option>
                <option  value="Medium">Medium</option>
                <option  value="Low">Low</option>
              </select>
            </div>

            <button className="btn dashboard-btn" onClick={resetFilters}>Reset Filters</button>
          </div>

          <div className="tasks-container">
            <h2 className="mb-4">Your Tasks</h2>
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <li className="task-item " key={task.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.status === "Completed"}
                    onChange={() => markAsCompletedMutation.mutate(task.id)}
                    disabled={task.status === "Completed"}
                  />
                  <h3>{task.title}</h3>
                  <Link to={`/task/${task.id}`} className="task-details-link">
                    <button className="btn dashboard-btn">Details</button>
                  </Link>
                  
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
