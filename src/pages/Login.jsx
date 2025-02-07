import  React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    
    const validUser = "user";
    const validUserPassword = "password";
    const validAdmin = "admin";
    const validAdminPassword = "admin";
  
    if (username === validUser && password === validUserPassword) {
      localStorage.setItem("token", "fake-jwt-token-user");
      localStorage.setItem("currentUser", "user");
      navigate("/dashboard");
    } else if (username === validAdmin && password === validAdminPassword) {
      localStorage.setItem("token", "fake-jwt-token-admin");
      localStorage.setItem("currentUser", "admin");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  

  return (
    <div className="login-container ">
      <h1 className="task-tracker-title">Task Tracker</h1>
      <h3 className="login-text mb-2" >Login</h3>
      <form className=" d-flex flex-column justify-content-center align-items-center" onSubmit={handleLogin}>
        <input
          className="login-input form-control form-control-lg mb-5" 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className=" login-input form-control form-control-lg mb-5" 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn" type="submit">→</button>
      </form>
    </div>
  );
}

export default Login;
