import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../components/Notification";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = savedTasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });

  return (
    <div className="edit-task-container container">
      <h1 className="edit-task-title">Edit Task</h1>
      <Notification message={notification} onClose={() => setNotification("")} />

      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedTasks = savedTasks.map((t) =>
            t.id === task.id ? { ...t, ...values } : t
          );

          localStorage.setItem("tasks", JSON.stringify(updatedTasks));

          setNotification("Task updated successfully!");

          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }}
      >
        {({ isSubmitting }) => (
          <div className="edit-task-form">
          <Form className="row g-4">
            <div className="col-md-6">
              <label className="form-label ">Title:</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="text-danger small" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Due Date:</label>
              <Field type="date" name="dueDate" className="form-control" />
              <ErrorMessage name="dueDate" component="div" className="text-danger small" />
            </div>

            <div className="col-md-12">
              <label className="form-label">Description:</label>
              <Field as="textarea" name="description" className="form-control" rows="3" />
              <ErrorMessage name="description" component="div" className="text-danger small" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Status:</label>
              <Field as="select" name="status" className="form-select">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Field>
            </div>

            <div className="col-md-6">
              <label className="form-label">Priority:</label>
              <Field as="select" name="priority" className="form-select">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Field>
            </div>

            <div className="col-md-12 d-flex justify-content-center edit-btn">
              <button type="submit" disabled={isSubmitting} className="btn  w-100">
                Save Changes
              </button>
            </div>

            <div className="col-md-12 d-flex justify-content-center mt-3 edit-btn">
                <button 
                  type="button" 
                  onClick={() => navigate("/dashboard")} 
                  className="btn  w-100"
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

export default EditTask;
