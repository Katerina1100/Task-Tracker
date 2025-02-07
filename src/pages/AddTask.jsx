import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../components/Notification";

function AddTask() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });

  return (
    <div className="add-task-container">
      
      <h1 className="add-new-task-title">Add New Task</h1>
      <Notification message={notification} onClose={() => setNotification("")} />

      <Formik
        initialValues={{ title: "", description: "", status: "To Do", priority: "Medium", dueDate: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
          const currentUser = localStorage.getItem("currentUser") || "user";
          // Додавање на поле owner
          const newTask = { id: savedTasks.length + 1, owner: currentUser, ...values };
          const updatedTasks = [...savedTasks, newTask];
        
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          setNotification("Task added successfully!");
          resetForm();
        
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }}
        
        
      >
        
        {({ isSubmitting }) => (
          <div className="add-task-form">
          <Form className="row g-4 ">
          <div className="col-md-6">
            <label>Title:</label>
            <Field type="text" name="title" className="form-control" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="col-md-6">
            <label>Due Date:</label>
            <Field type="date" name="dueDate" className="form-control" />
            <ErrorMessage name="dueDate" component="div" className="error" />
          </div>

          <div className="col-md-12">
            <label>Description:</label>
            <Field as="textarea" name="description" className="form-control" rows="3" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <div className="col-md-6">
            <label>Status:</label>
            <Field as="select" name="status" className="form-select">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Field>
          </div>

          <div className="col-md-6">
            <label>Priority:</label>
            <Field as="select" name="priority" className="form-select">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Field>
          </div>

          <div className="col-md-12 d-flex justify-content-center  ">
            <button type="submit" disabled={isSubmitting} className="btn  w-100">
              Add Task
            </button>
          </div>

          <div className="col-md-12 d-flex justify-content-center mt-3">
                <button 
                  type="button" 
                  onClick={() => navigate("/dashboard")} 
                  className="btn w-100"
                >
                  Back to Dashboard
                </button>
              </div>
        </Form>

          </div>
        )}
        
      </Formik>
    </div>
  );
}

export default AddTask;
