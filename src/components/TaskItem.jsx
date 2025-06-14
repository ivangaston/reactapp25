function TaskItem({ task, onDelete, onEdit, onToggle }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 className={task.completed ? 'done' : ''}>{task.title}</h3>
      <p>{task.description}</p>
      <p>Categoria: {task.category}</p>
      <button onClick={() => onToggle(task)}>
        {task.completed ? 'Desmarcar' : 'Completar'}
      </button>
      <button id="btnEdit" onClick={() => onEdit(task)}>Editar</button>
      <button id="btnDelete" onClick={() => onDelete(task.id)}>Eliminar</button>
      <hr />
    </div>
  )
}

export default TaskItem
