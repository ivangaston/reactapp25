import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default TaskList
