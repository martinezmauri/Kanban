import style from "./Task.module.css";
export const Task = ({ task }: any) => {
  return (
    <div className={style.hero}>
      <div className={style.kanbanColumn}>
        <h3>To do</h3>
        <div>
          <h4>Tarea 1</h4>
          <h4>Tarea 2</h4>
        </div>
      </div>
      <div className={style.kanbanColumn}>
        <h3>In Progress</h3>
        <div>
          <h4>Tarea 1</h4>
          <h4>Tarea 2</h4>
        </div>
      </div>
      <div className={style.kanbanColumn}>
        <h3>Done</h3>
        <div>
          <h4>Tarea 1</h4>
          <h4>Tarea 2</h4>
        </div>
      </div>
    </div>
  );
};
