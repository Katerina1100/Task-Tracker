import { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Пораката ќе исчезне по 3 секунди

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "green",
      color: "white",
      padding: "10px",
      borderRadius: "5px"
    }}>
      {message}
    </div>
  );
}

export default Notification;
