export const Task = ({ task }: any) => {
  return (
    <div>
      <h4>{task.title}</h4>
      <h5>{task.status.status}</h5>
    </div>
  );
};
