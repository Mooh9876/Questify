import type { Task } from '../types';

type TaskCardProps = {
  task: Task;
  onComplete: (id: string) => void;
};

export const TaskCard = ({ task, onComplete }: TaskCardProps) => (
  <article className={`task-card ${task.completed ? 'task-card-completed' : ''}`}>
    <div className="task-card-top">
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description ? <p>{task.description}</p> : null}
      </div>
      <span className="xp-badge">+{task.xp} XP</span>
    </div>

    <div className="task-card-bottom">
      <span className={`status-pill ${task.completed ? 'status-done' : 'status-open'}`}>
        {task.completed ? 'Erledigt' : 'Offen'}
      </span>
      <button
        className={task.completed ? 'secondary-button' : 'primary-button'}
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
      >
        {task.completed ? 'Abgeschlossen' : 'Abschließen'}
      </button>
    </div>
  </article>
);