import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../components/Task/Task";

export const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchingTasks = async (): Promise<void> => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setTasks(response.data);
      } catch (error: any) {
        console.log("Error fetching", error.response.data.message);
      }
    };
    fetchingTasks();
  }, [tasks]);
  return (
    <div>
      <h1>Tareas </h1>
      <div>
        {tasks.length === 0 ? (
          <div>No existen turnos</div>
        ) : (
          tasks.map((task, index) => (
            <Task key={index} task={task} /> /* task.id ? task.id : index */
          ))
        )}
      </div>
    </div>
  );
};
