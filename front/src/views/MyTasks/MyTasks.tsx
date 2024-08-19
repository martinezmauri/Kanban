import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../components/Task/Task";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    } else {
      const fetchingTasks = async (): Promise<void> => {
        try {
          const response = await axios.get(
            `http://localhost:3000/tasks/${user.id}`
          );
          if (response.status === 200) {
            setTasks(response.data);
          }
        } catch (error: any) {
          console.log("Error", error);
        }
      };
      fetchingTasks();
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Tareas </h1>
      <div>{<Task task={tasks} />}</div>
    </div>
  );
};
