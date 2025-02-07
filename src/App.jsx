import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import AddTask from "./pages/AddTask";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/task/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
      <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
      <Route path="/add-task" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
